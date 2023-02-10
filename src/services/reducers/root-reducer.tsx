import { constructorIngredientsReducer } from './constructor-ingredients';
import { popupedIndredientReducer } from './popuped-ingredient';
import { combineReducers } from 'redux';
import { tabsIngredientReducer } from './tabs-ingredients';
import {
  apiForgotPasswordReducer, apiGetUserReducer, apiIngredientsReducer, apiLoginReducer, apiLogoutReducer, apiOrderReducer,
  apiPatchUserReducer, apiRefreshTokensReducer, apiRegUserReducer, apiResetPasswordReducer
} from '../api-actions-generation';
import { internalUserReducer } from './internal-user';

export const rootReducer = combineReducers({
  apiIngredients: apiIngredientsReducer,
  apiOrder: apiOrderReducer,
  constructorIngredients: constructorIngredientsReducer,
  popupedIndredient: popupedIndredientReducer,
  tabsIngredient: tabsIngredientReducer,
  regUser: apiRegUserReducer,
  login: apiLoginReducer,
  forgotPassword: apiForgotPasswordReducer,
  resetPassword: apiResetPasswordReducer,
  logout: apiLogoutReducer,
  getUser: apiGetUserReducer,
  patchUser: apiPatchUserReducer,
  internalUser: internalUserReducer,
  refreshTokens: apiRefreshTokensReducer
});