import { TConstructorIngredient } from '../../utils/common-types/interfaces';
import { ChangeBunAction, AddIngredientToBurgerAction, RemoveIngredientFromBurgerAction, ChangeIngredientsOrderAction, ClearBurgerIngredients } from '../actions/constructor-ingredients';
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
            return { ...state, notBunIngredients: [...state.notBunIngredients.filter(o => o.key !== action.payload)] };
        })
        .addCase(ChangeIngredientsOrderAction, (state, action) => {
            const ingredients = [...state.notBunIngredients];
            const target = ingredients[action.payload.dragIndex];
            ingredients.splice(action.payload.dragIndex, 1);
            ingredients.splice(action.payload.hoverIndex, 0, target);
            return { ...state, notBunIngredients: ingredients };
        })
        .addCase(ClearBurgerIngredients, (state, action) => {
            return initConstructorIngredientsStore;
        }));