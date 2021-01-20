export abstract class NotificationService {
  /**
   * Helper method to display information in case of an error.
   * Useful when manually processing an error.
   *
   * @param error The error object in question, usually created by code other than the caller
   * For example, HttpClient will provide an error on failed HTTP attempts.
   * @param shortMsg Information message to display in the UI. Intended to provide user guidance
   */
  abstract handleUIError(error: Error, shortMsg: string): void;

  /**
   * Helper method to display simple, non-error messages.
   * Useful for information such as, "Update complete" or "Save complete"
   * @param msg Simple message to display to the user as contextual, "good to know" information.
   */
  abstract showUserMessage<T>(payload: T, msg: string): T;

  /**
   * Utility that will interpret success or failure of a promise and display
   * the correct message accordingly. Returns a promise so that any downstream processing
   * can continue.
   *
   * When handling errors, it will rethrow the original error
   * so that the consumer can choose to perform further error recovery
   *
   * @param p promise that may succeed or fail
   * @param successMsg message to display to user in case of success
   * @param errorMsg message to display to user in case of failure
   */
  abstract promiseNotify<T>(
    p: Promise<T>,
    successMsg: string,
    errorMsg?: string
  ): Promise<T>;
}
