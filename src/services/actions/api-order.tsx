import { createOrderApi } from '../../utils/api-requests';
import { IBurgerOrder } from '../../utils/common-types/interfaces';
import { AppThunk } from '../types';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';
import { ClearBurgerIngredients } from './constructor-ingredients';

export const ApiOrderRequestAction = createAction('API_ORDER_REQUEST');
export const ApiOrderSuccessAction = createAction('API_ORDER_SUCCESS', withPayloadType<IBurgerOrder>());
export const ApiOrderFailedAction = createAction<string, 'API_INGREDIENTS_FAILED'>('API_INGREDIENTS_FAILED');

export const createOrder = (ingredients: string[]): AppThunk => async (dispatch) => {
    try {
        dispatch(ApiOrderRequestAction());
        const data = await createOrderApi(ingredients);
        dispatch(ApiOrderSuccessAction(data));
        dispatch(ClearBurgerIngredients());
    } catch (error: any) {
        dispatch(ApiOrderFailedAction(error.message));
    }
}