import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { AuthenticationService } from '@bsc/shared/data-access-auth';

import { AuthorizationConfigToken } from './tokens';
import { AuthorizationConfig } from './types';
import { Observable } from 'rxjs';

@Injectable()
/**
 * Modifies HTTP requests to include user identity in HTTP headers.
 *
 * Note that this interceptor must be registered by the app before use.
 */
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    @Inject(AuthorizationConfigToken) private config: AuthorizationConfig,
    private authenticationService: AuthenticationService
  ) {}

  intercept<IncomingRequest>(
    req: HttpRequest<IncomingRequest>,
    next: HttpHandler
  ): Observable<HttpEvent<IncomingRequest>> {
    // In a real app this would need to attach the appropriate headers
    // to indicate the requesting user. JWT is a common example of
    // an auth/authz strategy that adds headers. .
    const modifiedReq = this.addHeaders(
      req,
      this.config,
      this.authenticationService
    );
    return next.handle(modifiedReq);
  }

  /**
   * Method responsible for attaching the appropriate headers to the request.
   * Written separately from the intercept method for ease of testing.
   *
   * @param req the incoming HttpRequest, usually provided by Angular
   * @param authConfig the authorization configuration for the app, passed here
   * for ease of testing
   * @param authenticationService the authentication service containing the
   * user for the request. Passed here for ease of testing
   * @return The request, possibly modified based upon configuration and business
   * needs
   */
  addHeaders<IncomingRequest>(
    req: HttpRequest<IncomingRequest>,
    authConfig: AuthorizationConfig,
    authenticationService: AuthenticationService
  ) {
    // If this app used cookie based authentication, the cookies
    // will be automatically included with each XHR request without the
    // need for interception.
    if (authConfig && authenticationService.currentUserSnapshot) {
      // grab the user identifier from the authentication service
      // and attach it to the header
    }
    return req;
  }
}
