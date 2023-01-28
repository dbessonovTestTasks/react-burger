import { getIngredientsDataApi } from '../../utils/api-requests';
import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import { AppThunk } from '../types';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';

export const ApiIngredientsRequestAction = createAction('API_INGREDIENTS_REQUEST');
export const ApiIngredientsSuccessAction = createAction('API_INGREDIENTS_SUCCESS', withPayloadType<IBurgerIngredient[]>());
export const ApiIngredientsFailedAction = createAction<string, 'API_INGREDIENTS_FAILED'>('API_INGREDIENTS_FAILED');

export const loadIngredients = (): AppThunk => async (dispatch) => {
    try {
        dispatch(ApiIngredientsRequestAction());
        const data = await getIngredientsDataApi();
        dispatch(ApiIngredientsSuccessAction(data.data));
    } catch (error: any) {
        dispatch(ApiIngredientsFailedAction(error.message));
    }
}