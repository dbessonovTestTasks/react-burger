import { TConstructorIngredient } from '../../utils/common-types/interfaces';
import {
    CHANGE_BUN_IN_BURGER,
    ADD_INGREDIENT_TO_BURGER,
    REMOVE_INGREDIENT_FROM_BURGER,
    TConstructorIngredientsActions
} from '../actions/constructor-ingredients';


interface IConstructorIngredientsStore {
    bun: TConstructorIngredient | null;
    notBunIngredients: TConstructorIngredient[];
}

const initConstructorIngredientsStore: IConstructorIngredientsStore = {
    bun: null,
    notBunIngredients: []
};

export const constructorIngredientsReducer = (state = initConstructorIngredientsStore, action: TConstructorIngredientsActions): IConstructorIngredientsStore => {
    switch (action.type) {
        case CHANGE_BUN_IN_BURGER: {
            return { ...state, bun: action.payload };
        }
        case ADD_INGREDIENT_TO_BURGER: {
            return { ...state, notBunIngredients: [...state.notBunIngredients, action.payload] };
        }
        case REMOVE_INGREDIENT_FROM_BURGER: {
            return { ...state, notBunIngredients: [...state.notBunIngredients.filter(o => o.key === action.payload.key)] };
        }
        default: {
            return state;
        }
    }
};