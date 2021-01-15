import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@bsc/shared/data-access-auth';

// Why bother with this little library?
// It provides all of the application feature libraries a centralized way
// to communicate the correct way of logging in and out.
// It allows the visual elements of logging in and out to be split out
// from the rest of the application.

@Injectable({ providedIn: 'root' })
export class LogInOutService {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  async login(username: string, password: string) {
    await this.authentication
      .login(username, password);
    return this.router.navigate(['/']);
  }

  logout() {
    this.authentication.logout()
    return this.router.navigate(['/login']);
  }
}
