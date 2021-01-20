import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification-service';

@Injectable()
export class MaterialNotificationService implements NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  handleUIError(error: Error, shortMsg: string) {
    this.snackBar.open(shortMsg, 'CLOSE', { duration: 8000 });
    console.error(shortMsg, error);
  }

  showUserMessage<T>(payload: T, msg: string) {
    this.snackBar.open(msg, 'CLOSE', { duration: 8000 });
    return payload;
  }

  promiseNotify<T>(p: Promise<T>, successMsg: string, errorMsg?: string) {
    return p
      .then(_ => this.showUserMessage(_, successMsg))
      .catch(error => {
        this.handleUIError(error, errorMsg || error.message);
        throw error;
      });
  }
}
