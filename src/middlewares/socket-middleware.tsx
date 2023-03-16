import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { wsActionsTypes, AppDispatch, RootState } from '../services/types';
import { refreshTokensApi } from '../utils/api-requests';

export const socketMiddleware = (wsActions: wsActionsTypes): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';
        let startAction: typeof wsActions.startAction | null = null;

        return next => (action: AnyAction) => {
            const { dispatch } = store;
            if (action.type === wsActions.startAction.type) {
                url = action.payload;
                socket = new WebSocket(action.payload);
                isConnected = true;
                startAction = action as typeof wsActions.startAction;
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(wsActions.onSuccessAction());
                };
                socket.onerror = event => {
                    dispatch(wsActions.onErrorAction(event));
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsed = JSON.parse(data);
                    if (!parsed?.success && parsed?.message === 'Invalid or missing token')
                        refreshTokensApi();
                    else
                        dispatch(wsActions.onGetMessageAction(parsed));
                };
                socket.onclose = event => {
                    if (event.code !== 1000) {
                        dispatch(wsActions.onErrorAction(event));
                    }
                    dispatch(wsActions.onClosedAction());
                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            !!startAction && dispatch(startAction!(url));
                        }, 3000)
                    }
                };
            }
            if (action.type === wsActions.endAction.type && socket && socket.readyState === 1) {
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
            }

            next(action);
        };
    }) as Middleware;
};