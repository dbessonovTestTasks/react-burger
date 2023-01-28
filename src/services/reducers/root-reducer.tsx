import { apiIngredientsReducer } from './api-ingredients';
import { apiOrderReducer } from './api-order';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { popupedIndredientReducer } from './popuped-ingredient';
import { combineReducers } from 'redux';
import { tabsIngredientReducer } from './tabs-ingredients';

export const rootReducer = combineReducers({
    apiIngredients: apiIngredientsReducer,    
    apiOrder: apiOrderReducer,
    constructorIngredients: constructorIngredientsReducer,
    popupedIndredient: popupedIndredientReducer,
    tabsIngredient: tabsIngredientReducer
  });