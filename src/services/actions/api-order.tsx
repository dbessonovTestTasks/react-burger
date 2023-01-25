import { createOrderApi } from '../../utils/api-requests';
import { IBurgerOrder } from '../../utils/common-types/interfaces';
import { AppDispatch, AppThunk } from '../types';

export const API_ORDER_REQUEST = 'API_ORDER_REQUEST';
export const API_ORDER_SUCCESS = 'API_ORDER_SUCCESS';
export const API_ORDER_FAILED = 'API_ORDER_FAILED';

export type TApiOrderRequestAction = { readonly type: typeof API_ORDER_REQUEST; };
export type TApiOrderSuccessAction = {
    readonly type: typeof API_ORDER_SUCCESS;
    readonly payload: IBurgerOrder;
};
export type TGetOrderFailedAction = {
    readonly type: typeof API_ORDER_FAILED;
    readonly payload: string;
};

export type TApiOrderActions =
    | TApiOrderRequestAction
    | TApiOrderSuccessAction
    | TGetOrderFailedAction;

export const createOrder = (ingredients: string[]): AppThunk => (dispatch: AppDispatch) => {
    return async function (dispatch: Function) {
        try {
            dispatch({ type: API_ORDER_REQUEST });
            const data = await createOrderApi(ingredients);
            dispatch({ type: API_ORDER_SUCCESS, payload: data.data });
        } catch (error: any) {
            dispatch({ type: API_ORDER_FAILED, payload: error.message });
        }
    };
}