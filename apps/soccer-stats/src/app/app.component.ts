import { Component } from '@angular/core';
import { AuthenticationService } from '@bsc/shared/data-access-auth';
import { LogInOutService } from '@bsc/soccer-stats/data-access-log-in-out';

@Component({
  selector: 'bsc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser = this.authenticationService.currentUser;

  constructor(
    private authenticationService: AuthenticationService,
    private logInOut: LogInOutService
  ) {}

  logout() {
    this.logInOut.logout();
  }
}
