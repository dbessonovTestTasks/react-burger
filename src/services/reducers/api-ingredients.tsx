import { IBurgerIngredient, TConstructorIngredient } from '../../utils/common-types/interfaces';
import {
    API_INGREDIENTS_REQUEST,
    API_INGREDIENTS_SUCCESS,
    API_INGREDIENTS_FAILED,
    TApiIngredientsActions
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

export const apiIngredientsReducer = (state = initIngredientsStore, action: TApiIngredientsActions): IIngredientsStore => {
    switch (action.type) {
        case API_INGREDIENTS_REQUEST: {
            return { ...state, ingredientsRequest: true };
        }
        case API_INGREDIENTS_SUCCESS: {
            return { ...state, ingredientsFailed: false, ingredients: action.payload, ingredientsRequest: false };
        }
        case API_INGREDIENTS_FAILED: {
            return { ...state, ingredientsFailed: true, ingredientsRequest: false, ingredientsErrorMessage: action.payload};
        }

        default: {
            return state;
        }
    }
};