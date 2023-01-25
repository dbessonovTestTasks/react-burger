
import { IBurgerIngredient } from '../../utils/common-types/interfaces';

export const ADD_POPUP_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const REMOVE_POPUP_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';

export type TAddPopupIngredientsAction = {
    readonly type: typeof ADD_POPUP_INGREDIENT_DETAILS;
    readonly payload: IBurgerIngredient;
};

export type TRemovePopupIngredientsAction = {
    readonly type: typeof REMOVE_POPUP_INGREDIENT_DETAILS;
};

export type TPopupIngredientsActions =
    | TAddPopupIngredientsAction
    | TRemovePopupIngredientsAction;