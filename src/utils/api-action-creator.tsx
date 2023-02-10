
import { AppDispatch, AppThunk } from '../services/types';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const apiActionCreator = <T, T2>(apiPrefix: string, apiCall: (params: T2) => Promise<T>,
  afterSuccessDispatch: (ActionCreatorWithoutPayload<string>) | (ActionCreatorWithPayload<T>) | null = null,
  afterSuccessData: ((data: T) => void) | null = null) => {
  const apiRequestAction = createAction(`${apiPrefix}/request`);
  const apiSuccessAction = createAction(`${apiPrefix}/success`, withPayloadType<T>());
  const apiFailedAction = createAction(`${apiPrefix}/failed`, withPayloadType<string>());

  const apiThunk: (params: T2) => AppThunk<void> = (params: T2): AppThunk => async (dispatch: AppDispatch) => {
    try {
      dispatch(apiRequestAction());
      const data = await apiCall(params);
      dispatch(apiSuccessAction(data));

      if (afterSuccessData)
        afterSuccessData(data);

      if (afterSuccessDispatch) {
        if (afterSuccessDispatch as ActionCreatorWithoutPayload<string>)
          dispatch((afterSuccessDispatch as ActionCreatorWithoutPayload<string>)());
        if (afterSuccessDispatch as ActionCreatorWithPayload<T>)
          dispatch((afterSuccessDispatch as ActionCreatorWithPayload<T>)(data));
      }

    } catch (error: any) {
      dispatch(apiFailedAction(error.message));
    }
  };

  return [apiRequestAction, apiSuccessAction, apiFailedAction, apiThunk] as const;
}