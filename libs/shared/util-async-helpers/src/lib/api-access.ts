import { defer, merge, Observable, of, Subject, timer } from 'rxjs';
import {
  delayWhen,
  filter,
  map,
  retryWhen,
  switchMap,
  tap
} from 'rxjs/operators';

export enum LoadResultStatus {
  IN_PROGRESS = 'In Progress',
  RETRYING = 'Retrying',
  WAITING = 'Waiting to Retry',
  SUCCESS = 'Success',
  ERROR = 'Error'
}

export interface InProgress {
  status: LoadResultStatus.IN_PROGRESS;
}

export interface Retrying {
  status: LoadResultStatus.RETRYING;
}

export interface Waiting {
  status: LoadResultStatus.WAITING;
}

export interface RequestError {
  status: LoadResultStatus.ERROR;
  error: Error;
  willRetry: boolean;
}

export interface Success<T> {
  status: LoadResultStatus.SUCCESS;
  results: T;
}

export type RequestUpdate<T> =
  | Success<T>
  | RequestError
  | Waiting
  | Retrying
  | InProgress;

export function isSuccess<T>(ru: RequestUpdate<T>): ru is Success<T> {
  return ru.status === LoadResultStatus.SUCCESS;
}

interface LoadWithRetryOptions {
  // To retry once after failure, use attempts=2
  attempts: number;
  retryDelayMs: number;
  retryBackoffCoefficient: number;
  retryMaxDelayMs: number;
}

const DEFAULT_OPTIONS: LoadWithRetryOptions = {
  attempts: 1,
  retryDelayMs: 2000,
  retryBackoffCoefficient: 1.5,
  retryMaxDelayMs: 30000
};

export function loadWithRetry<S, T>(
  producer: (key: S) => Observable<T>,
  source?: Observable<S>,
  opts?: LoadWithRetryOptions
): Observable<RequestUpdate<T>> {
  const options = { ...DEFAULT_OPTIONS, ...opts };
  if (!source) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    source = (of(undefined) as any) as Observable<S>;
  }
  return source.pipe(
    switchMap(key => {
      const sideChannel = new Subject<RequestUpdate<T>>();
      let attempt = 0;
      return merge(
        of({ status: LoadResultStatus.IN_PROGRESS } as const),
        sideChannel,
        defer(() => {
          attempt++;
          return producer(key);
        }).pipe(
          retryWhen(errors =>
            errors.pipe(
              tap(error =>
                sideChannel.next({
                  status: LoadResultStatus.ERROR,
                  error,
                  willRetry: attempt < options.attempts
                } as const)
              ),
              filter(_ => attempt < options.attempts),
              tap(() =>
                sideChannel.next({ status: LoadResultStatus.WAITING } as const)
              ),
              delayWhen(() => retryDelay(options, attempt)),
              tap(() =>
                sideChannel.next({ status: LoadResultStatus.RETRYING } as const)
              )
            )
          ),
          map(
            (results: T) =>
              ({ status: LoadResultStatus.SUCCESS, results } as const)
          )
        )
      );
    })
  );
}

function retryDelay(
  options: LoadWithRetryOptions,
  attempt: number
): Observable<unknown> {
  const jitter = (Math.random() - 0.5) * options.retryDelayMs * 0.5;
  let delay =
    options.retryDelayMs *
      Math.pow(options.retryBackoffCoefficient, attempt - 1) +
    jitter;
  delay = Math.min(delay, options.retryMaxDelayMs);
  return timer(delay);
}

/**
 * This operator may be used to automatically retrieve the 'results'
 * of a successful 'loadWithRetry' operation.
 *
 * However, only use this operator if you do not care about the
 * intermediate state of the LoardResultStatus, as this will filter
 * out everything besides the SUCCESS state;
 * states such as 'IN_PROGRESS' or 'ERROR' will not be available
 * should those be needed for presentation logic.
 */
export function waitForResults() {
  return <T>(source: Observable<RequestUpdate<T>>) =>
    source.pipe(
      filter(res => res.status === LoadResultStatus.SUCCESS),
      map(res => (res as Success<T>).results)
    );
}

export function waitForError() {
  return (source: Observable<RequestUpdate<unknown>>) =>
    source.pipe(
      filter(
        (res): res is RequestError => res.status === LoadResultStatus.ERROR
      )
    );
}

export function whenErrored<T>(
  errorHandler: (requestError: RequestError) => T
) {
  return (source: Observable<RequestUpdate<T>>) =>
    source.pipe(
      switchMap(requestUpdate => {
        if (requestUpdate.status === LoadResultStatus.ERROR) {
          const newPayload: T = errorHandler(requestUpdate);
          return of({
            status: LoadResultStatus.SUCCESS,
            results: newPayload
          } as RequestUpdate<T>);
        } else {
          return of(requestUpdate);
        }
      })
    );
}
