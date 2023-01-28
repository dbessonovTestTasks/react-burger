import { rootReducer } from './reducers/root-reducer';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production'
  }) 