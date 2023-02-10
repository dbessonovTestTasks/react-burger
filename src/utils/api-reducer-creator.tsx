import { ActionCreatorWithoutPayload, ActionCreatorWithPreparedPayload, createReducer } from '@reduxjs/toolkit';
import { IRequest } from './common-types/interfaces'

export const apiReducerCreator = <T = any>
    (requestAction: ActionCreatorWithoutPayload<`${string}/request`>,
        succesAction: ActionCreatorWithPreparedPayload<[t: T], T, `${string}/success`, never, never>,
        failedAction: ActionCreatorWithPreparedPayload<[t: string], string, `${string}/failed`, never, never>,
        onDataReceived?: (params: T) => void) => {
    interface IRequestStore extends IRequest { answer: T | null }

    const initStore: IRequestStore = {
        answer: null,
        request: false,
        failed: false,
        errorMessage: ''
    };

    return createReducer(initStore, (builder) =>
        builder
            .addCase(requestAction, (state): IRequestStore => {
                return { ...state, answer: null, request: true, failed: false };
            })
            .addCase(succesAction, (state, action): IRequestStore => {
                if (!!onDataReceived)
                    onDataReceived(action.payload);
                return { ...state, answer: action.payload, request: false, failed: false };
            })
            .addCase(failedAction, (state, action): IRequestStore => {
                return { answer: null, failed: true, request: false, errorMessage: action.payload };
            }));
}