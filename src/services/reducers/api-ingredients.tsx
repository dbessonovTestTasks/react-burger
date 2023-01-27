import { createReducer } from '@reduxjs/toolkit';
import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import {
    ApiIngredientsRequestAction,
    ApiIngredientsSuccessAction,
    ApiIngredientsFailedAction
} from '../actions/api-ingredients';


interface IIngredientsStore {
    ingredients: IBurgerIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredientsErrorMessage: string;
}

const initIngredientsStore: IIngredientsStore = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsErrorMessage: ''
};

export const apiIngredientsReducer = createReducer(initIngredientsStore, (builder) =>
    builder
        .addCase(ApiIngredientsRequestAction, (state) => {
            return { ...state, ingredientsRequest: true };
        })
        .addCase(ApiIngredientsSuccessAction, (state, action) => {
            return { ...state, ingredientsFailed: false, ingredients: action.payload, ingredientsRequest: false };
        })
        .addCase(ApiIngredientsFailedAction, (state, action) => {
            return { ingredients: [], ingredientsFailed: true, ingredientsRequest: false, ingredientsErrorMessage: action.payload };
        }));