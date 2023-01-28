import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import { AddPopupIngredientsAction, RemovePopupIngredientsAction } from '../actions/popuped-ingredient';
import { createReducer } from '@reduxjs/toolkit';

interface IPopupedIndredientStore {
    popupedIndredient: IBurgerIngredient | null;
}

const initPopupedIndredientStore: IPopupedIndredientStore = {
    popupedIndredient: null
};

export const popupedIndredientReducer = createReducer(initPopupedIndredientStore, (builder) =>
    builder
        .addCase(AddPopupIngredientsAction, (state, action) => {
            return { popupedIndredient: action.payload };
        })
        .addCase(RemovePopupIngredientsAction, (state, action) => {
            return initPopupedIndredientStore;
        }));