import { Environment } from '../app/types';

export const environment: Environment = {
  production: true,
  e2e: false,
  authenticationConfig: {
    authenticationServerAddress: 'some auth server',
    dev: false
  },
  authorizationConfig: {
    authorizationServerAddress: 'some authz server',
    dev: false
  },
  baseUrl: 'https://api.angularbootcamp.com/'
};
