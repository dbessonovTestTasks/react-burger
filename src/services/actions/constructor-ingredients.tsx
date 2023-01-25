import { TConstructorIngredient } from '../../utils/common-types/interfaces';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/utils';

export const ChangeBunAction = createAction('CHANGE_BUN_IN_BURGER', withPayloadType<TConstructorIngredient>());
export const AddIngredientToBurgerAction = createAction('ADD_INGREDIENT_TO_BURGER', withPayloadType<TConstructorIngredient>());
export const RemoveIngredientFromBurgerAction = createAction('REMOVE_INGREDIENT_FROM_BURGER', withPayloadType<TConstructorIngredient>());