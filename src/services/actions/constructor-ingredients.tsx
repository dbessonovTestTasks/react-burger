import { TConstructorIngredient } from '../../utils/common-types/interfaces';

export const CHANGE_BUN_IN_BURGER = 'CHANGE_BUN_IN_BURGER';
export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const REMOVE_INGREDIENT_FROM_BURGER = 'REMOVE_INGREDIENT_FROM_BURGER';

export type TChangeBunAction = {
    readonly type: typeof CHANGE_BUN_IN_BURGER;
    readonly payload: TConstructorIngredient;
};

export type TAddIngredientToBurgerAction = {
    readonly type: typeof ADD_INGREDIENT_TO_BURGER;
    readonly payload: TConstructorIngredient;
};

export type TRemoveIngredientFromBurgerAction = {
    readonly type: typeof REMOVE_INGREDIENT_FROM_BURGER;
    readonly payload: TConstructorIngredient;
};

export type TConstructorIngredientsActions =
    | TChangeBunAction
    | TAddIngredientToBurgerAction
    | TRemoveIngredientFromBurgerAction;