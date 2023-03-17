import { rootReducer } from './reducers/root-reducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import { wsCommonOrdersActions, wsUserOrdersActions } from './ws-actions-generation';

export type wsActionsTypes = typeof wsCommonOrdersActions | typeof wsUserOrdersActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, never, AnyAction>;
export type AppDispatch = ThunkDispatch<RootState, never, AnyAction>;