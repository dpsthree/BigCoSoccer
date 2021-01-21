import { User } from '@bsc/shared/data-access-auth';

import {Player} from '@bsc/soccer-stats/util-shared-types';

export interface AppState {
  user: User | null;
}

export interface PlayerStatsState {
  players: Player[];
}
