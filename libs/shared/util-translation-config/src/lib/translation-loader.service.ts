import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';

import {
  loadWithRetry,
  MaterialNotificationService,
  waitForResults,
  whenErrored
} from '@bsc/shared/util-async-helpers';

import { TranslationPath } from './tokens';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    private notificationService: MaterialNotificationService,
    @Inject(TranslationPath) private translationPath: string
  ) {}

  getTranslation(langPath: string) {
    const translationLoadRequest = loadWithRetry(() =>
      this.http.get<Translation>(`${this.translationPath}/${langPath}.json`)
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));

    return translationLoadRequest.pipe(
      whenErrored(errorUpdate => {
        this.notificationService.handleUIError(
          errorUpdate.error,
          'Unable to load translations'
        );
        return {};
      }),
      waitForResults()
    );
  }
}
