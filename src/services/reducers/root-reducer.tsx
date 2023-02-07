import { constructorIngredientsReducer } from './constructor-ingredients';
import { popupedIndredientReducer } from './popuped-ingredient';
import { combineReducers } from 'redux';
import { tabsIngredientReducer } from './tabs-ingredients';
import { apiForgotPasswordReducer, apiIngredientsReducer, apiOrderReducer, apiRegUserReducer, apiResetPasswordReducer } from './api-actions';

export const rootReducer = combineReducers({
    apiIngredients: apiIngredientsReducer,    
    apiOrder: apiOrderReducer,
    constructorIngredients: constructorIngredientsReducer,
    popupedIndredient: popupedIndredientReducer,
    tabsIngredient: tabsIngredientReducer,
    forgotPassword: apiForgotPasswordReducer,
    regUser: apiRegUserReducer,
    resetPassword: apiResetPasswordReducer
  });