import { AuthenticationConfig } from '@bsc/shared/data-access-auth';
import { AuthorizationConfig } from '@bsc/shared/data-access-authz';

export interface Environment {
  production: boolean;
  authenticationConfig: AuthenticationConfig;
  authorizationConfig: AuthorizationConfig;
}
