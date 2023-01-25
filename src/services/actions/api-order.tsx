import { createOrderApi } from '../../utils/api-requests';
import { IBurgerOrder } from '../../utils/common-types/interfaces';
import { AppDispatch, AppThunk } from '../types';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';

export const ApiOrderRequestAction = createAction('API_ORDER_REQUEST');
export const ApiOrderSuccessAction = createAction('API_ORDER_SUCCESS', withPayloadType<IBurgerOrder>());
export const ApiOrderFailedAction = createAction<string, 'API_INGREDIENTS_FAILED'>('API_INGREDIENTS_FAILED');

export const createOrder = (ingredients: string[]): AppThunk => (dispatch: AppDispatch) => {
    return async function (dispatch: Function) {
        try {
            dispatch(ApiOrderRequestAction());
            const data = await createOrderApi(ingredients);
            dispatch(ApiOrderSuccessAction(data.data));
        } catch (error: any) {
            dispatch(ApiOrderFailedAction(error.message));
        }
    };
}