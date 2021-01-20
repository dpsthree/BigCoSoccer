import { createAction, props } from '@ngrx/store';

import { User } from '@bsc/shared/data-access-auth';

export const userChange = createAction(
  'userChange',
  props<{ user: User | null }>()
);
