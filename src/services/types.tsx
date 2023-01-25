import { rootReducer } from './reducers/root-reducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TApplicationActions } from './actions/common';

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;