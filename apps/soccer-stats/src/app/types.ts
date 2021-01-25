import { AuthenticationConfig } from '@bsc/shared/data-access-auth';
import { AuthorizationConfig } from '@bsc/shared/data-access-authz';

export interface Environment {
  production: boolean;
  e2e: boolean;
  authenticationConfig: AuthenticationConfig;
  authorizationConfig: AuthorizationConfig;
  baseUrl: string;
}
