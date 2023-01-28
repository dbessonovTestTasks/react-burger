import { rootReducer } from './reducers/root-reducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, AnyAction>;
export type AppDispatch = ThunkDispatch<RootState, never, AnyAction>;