export interface AuthenticationConfig {
  dev: boolean;
  authenticationServerAddress: string;
}

// This should represent a user of the software
// found within this monorepo. It should not contain
// details of the user as it is stored in the backing
// authentication service unless it is relevant to
// the applications functionality.
// (This is an abstraction)
export interface User {
  username: string;
  displayName: string;
  avatarUrl: string;
}
