import { getIngredientsDataApi } from '../../utils/api-requests';
import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import { AppDispatch, AppThunk } from '../types';

export const API_INGREDIENTS_REQUEST = 'API_INGREDIENTS_REQUEST';
export const API_INGREDIENTS_SUCCESS = 'API_INGREDIENTS_SUCCESS';
export const API_INGREDIENTS_FAILED = 'API_INGREDIENTS_FAILED';

export type TApiIngredientsRequestAction = { readonly type: typeof API_INGREDIENTS_REQUEST; };
export type TApiIngredientsSuccessAction = {
    readonly type: typeof API_INGREDIENTS_SUCCESS;
    readonly payload: IBurgerIngredient[];
};
export type TGetIngredientsFailedAction = {
    readonly type: typeof API_INGREDIENTS_FAILED;
    readonly payload: string;
};

export type TApiIngredientsActions =
    | TApiIngredientsRequestAction
    | TApiIngredientsSuccessAction
    | TGetIngredientsFailedAction;

export const loadIngredients = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: API_INGREDIENTS_REQUEST });
        const data = await getIngredientsDataApi();
        dispatch({ type: API_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error: any) {
        dispatch({ type: API_INGREDIENTS_FAILED, payload: error.message});
    }
}