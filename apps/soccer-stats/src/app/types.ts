import { AuthenticationConfig } from '@bsc/shared/data-access-auth';

export interface Environment {
  production: boolean;
  authenticationConfig: AuthenticationConfig;
}
