
import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/api-action-creator';

export const AddPopupIngredientsAction = createAction('ADD_POPUP_INGREDIENT_DETAILS', withPayloadType<IBurgerIngredient>());
export const RemovePopupIngredientsAction = createAction('REMOVE_POPUP_INGREDIENT_DETAILS');