import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';

import { AuthorizationService } from '@bsc/shared/data-access-authz';

@Injectable({ providedIn: 'root' })
export class GuardsService implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const fullPath = buildPath(route.url);
    const authorized = this.authorizationService.checkRouteAccess(fullPath);
    return authorized || this.router.parseUrl('/login');
  }
}

export function buildPath(urls: UrlSegment[]): string {
  let fullPath = '';
  urls.forEach(segment => (fullPath += `/${segment.path}`));
  return fullPath;
}
