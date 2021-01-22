import { cardTypes } from '@bsc/soccer-stats/data-access-app-state';

export const selectedGameIdRouteParamName = 'gameId';

export const cardTypesList: string[] = Object.keys(cardTypes).map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  k => (cardTypes as any)[k]
);
