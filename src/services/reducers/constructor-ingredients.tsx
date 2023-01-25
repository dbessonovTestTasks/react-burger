import { TConstructorIngredient } from '../../utils/common-types/interfaces';
import { ChangeBunAction, AddIngredientToBurgerAction, RemoveIngredientFromBurgerAction } from '../actions/constructor-ingredients';
import { createReducer } from '@reduxjs/toolkit';

interface IConstructorIngredientsStore {
    bun: TConstructorIngredient | null;
    notBunIngredients: TConstructorIngredient[];
}

const initConstructorIngredientsStore: IConstructorIngredientsStore = {
    bun: null,
    notBunIngredients: []
};

export const constructorIngredientsReducer = createReducer(initConstructorIngredientsStore, (builder) =>
    builder
        .addCase(ChangeBunAction, (state, action) => {
            return { ...state, bun: action.payload };
        })
        .addCase(AddIngredientToBurgerAction, (state, action) => {
            return { ...state, notBunIngredients: [...state.notBunIngredients, action.payload] };
        })
        .addCase(RemoveIngredientFromBurgerAction, (state, action) => {
            return { ...state, notBunIngredients: [...state.notBunIngredients.filter(o => o.key === action.payload.key)] };
        }));