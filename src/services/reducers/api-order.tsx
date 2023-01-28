import { IBurgerOrder } from '../../utils/common-types/interfaces';
import { ApiOrderRequestAction, ApiOrderSuccessAction, ApiOrderFailedAction } from '../actions/api-order';
import { createReducer } from '@reduxjs/toolkit';

interface IOrderStore {
    order: IBurgerOrder | null;
    orderRequest: boolean;
    orderFailed: boolean;
    orderErrorMessage: string;
}

const initOrderStore: IOrderStore = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    orderErrorMessage: ''
};

export const apiOrderReducer = createReducer(initOrderStore, (builder) =>
    builder
        .addCase(ApiOrderRequestAction, (state) => {
            return { ...state, orderRequest: true, order: null };
        })
        .addCase(ApiOrderSuccessAction, (state, action) => {
            return { ...state, orderFailed: false, order: action.payload, orderRequest: false };
        })
        .addCase(ApiOrderFailedAction, (state, action) => {
            return { order: null, orderFailed: true, orderRequest: false, orderErrorMessage: action.payload };
        }));