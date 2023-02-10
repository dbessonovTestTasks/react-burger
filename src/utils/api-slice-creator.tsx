

import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { apiReducerCreator } from './api-reducer-creator';
import { apiActionCreator } from './api-action-creator';

export const apiSliceCreator = <T, T2>(apiPrefix: string, apiCall: (params: T2) => Promise<T>,
  afterSuccessDispatch: (ActionCreatorWithoutPayload<string>) | (ActionCreatorWithPayload<T>) | null = null,
  afterSuccessData: ((data: T) => void) | null = null) => {
  const [apiRequestAction, apiSuccessAction, apiFailedAction, apiThunk]
    = apiActionCreator<T, T2>(apiPrefix, apiCall, afterSuccessDispatch, afterSuccessData);

  const reducer = apiReducerCreator(apiRequestAction, apiSuccessAction, apiFailedAction);
  return [reducer, apiThunk] as const;
}