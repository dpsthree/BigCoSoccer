import { Component } from '@angular/core';

import { Credentials } from '@bsc/shared/ui-components';
import { LogInOutService } from '@bsc/soccer-stats/data-access-log-in-out';

@Component({
  selector: 'bsc-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  msg = '';

  constructor(private logInOut: LogInOutService) {}

  async login(credentials: Credentials) {
    this.msg = 'logging in...';

    try {
      await this.logInOut.login(credentials.username, credentials.password);
      this.msg = 'Welcome';
    } catch (err) {
      this.msg = 'Failed to login';
    }
  }
}
