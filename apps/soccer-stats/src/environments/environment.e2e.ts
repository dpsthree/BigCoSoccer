import { Environment } from '../app/types';

export const environment: Environment = {
  production: false,
  e2e: true,
  authenticationConfig: { authenticationServerAddress: 'localhost', dev: true },
  authorizationConfig: { authorizationServerAddress: 'localhost', dev: true },
  baseUrl: 'http://localhost:8085'
};
