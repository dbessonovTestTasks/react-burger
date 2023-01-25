import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import {
    ADD_POPUP_INGREDIENT_DETAILS,
    REMOVE_POPUP_INGREDIENT_DETAILS,
    TPopupIngredientsActions
} from '../actions/popuped-ingredient';


interface IPopupedIndredientStore { 
    popupedIndredient: IBurgerIngredient|null;
}

const initPopupedIndredientStore: IPopupedIndredientStore = {
    popupedIndredient: null
};

export const popupedIndredientReducer = (state = initPopupedIndredientStore, action: TPopupIngredientsActions): IPopupedIndredientStore => {
    switch (action.type) {
        case ADD_POPUP_INGREDIENT_DETAILS: {
            return { popupedIndredient: action.payload };
        }
        case REMOVE_POPUP_INGREDIENT_DETAILS: {
            return initPopupedIndredientStore;
        }
        default: {
            return state;
        }
    }
};