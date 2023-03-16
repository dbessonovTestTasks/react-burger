
import { createAction, createReducer } from '@reduxjs/toolkit';
import { withPayloadType } from './api-action-creator';

export const wsSliceCreator = <T,>(apiPrefix: string) => {

    const startAction = createAction(`${apiPrefix}/start`, withPayloadType<string>());
    const endAction = createAction(`${apiPrefix}/end`);
    const onSuccessAction = createAction(`${apiPrefix}/onsuccess`);
    const onErrorAction = createAction(`${apiPrefix}/onerror`, withPayloadType<Event>());
    const onClosedAction = createAction(`${apiPrefix}/onclosed`);
    const onGetMessageAction = createAction(`${apiPrefix}/ongetMessage`, withPayloadType<T>());
    const actions = { startAction, endAction, onSuccessAction, onErrorAction, onClosedAction, onGetMessageAction };

    interface IRequestStore {
        wsConnected: boolean;
        error: Event | null;
        wsData: T | null;
    }

    const initStore: IRequestStore = {
        wsConnected: false,
        error: null,
        wsData: null
    };

    const reducer = createReducer(initStore, (builder) =>
        builder
            .addCase(onSuccessAction, (state): IRequestStore => {
                return { wsConnected: true, error: null, wsData: null };
            })
            .addCase(onErrorAction, (state, action): IRequestStore => {
                return { wsConnected: false, error: action.payload, wsData: null };
            })
            .addCase(onClosedAction, (state): IRequestStore => {
                return { wsConnected: false, error: null, wsData: null };
            })
            .addCase(onGetMessageAction, (state, action): IRequestStore => {
                return { wsConnected: true, error: null, wsData: action.payload };
            }));

    return [actions, reducer] as const;
}