import { TConstructorIngredient, IExchangeElements } from '../../utils/common-types/interfaces';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';

export const ChangeBunAction = createAction('CHANGE_BUN_IN_BURGER', withPayloadType<TConstructorIngredient>());
export const AddIngredientToBurgerAction = createAction('ADD_INGREDIENT_TO_BURGER', withPayloadType<TConstructorIngredient>());
export const RemoveIngredientFromBurgerAction = createAction('REMOVE_INGREDIENT_FROM_BURGER', withPayloadType<string>());
export const ChangeIngredientsOrderAction = createAction('CHANGE_INGREDIENTS_ORDER', withPayloadType<IExchangeElements>());
export const ClearBurgerIngredients = createAction('CLEAR_BURGER_INGREDIENTS');
