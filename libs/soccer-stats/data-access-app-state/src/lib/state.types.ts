import { User } from '@bsc/shared/data-access-auth';

export interface AppState {
  user: User | null;
}
