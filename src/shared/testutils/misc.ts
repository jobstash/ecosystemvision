export type MswOptions = {
  networkDelay?: number | 'infinite';
};

export const DEFAULT_MSW_OPTIONS: MswOptions = {
  networkDelay: 0,
};

export const enum MockQueryResult {
  NETWORK_ERROR,
  FETCH_ERROR,
  NOT_FOUND,
  SUCCESS,
}

export const enum MockInfiniteQueryResult {
  NETWORK_ERROR,
  FETCH_ERROR,
  EMPTY,
  END_OF_RESULTS,
  SUCCESS,
}
