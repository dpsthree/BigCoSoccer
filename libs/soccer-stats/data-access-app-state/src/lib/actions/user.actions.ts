import { createAction, props } from '@ngrx/store';

import { User } from '@bsc/shared/data-access-auth';

export const userChange = createAction(
  'USER_LOGIN',
  props<{ user: User | null }>()
);
