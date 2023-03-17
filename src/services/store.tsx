import { rootReducer } from './reducers/root-reducer';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from '../middlewares/socket-middleware';
import { wsCommonOrdersActions, wsUserOrdersActions } from './ws-actions-generation';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    .concat(socketMiddleware(wsCommonOrdersActions))
    .concat(socketMiddleware(wsUserOrdersActions)),
  devTools: process.env.NODE_ENV !== 'production'
}) 