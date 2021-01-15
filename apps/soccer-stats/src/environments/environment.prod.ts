import { Environment } from '../app/types';

export const environment: Environment = {
  production: true,
  authenticationConfig: {
    authenticationServerAddress: 'some auth server',
    dev: false
  },
  authorizationConfig: {
    authorizationServerAddress: 'some authz server',
    dev: false
  }
};
