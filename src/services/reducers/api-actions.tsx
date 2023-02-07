import { apiReducerCreator } from '../../utils/api-reducer-creator';
import { setCookie } from '../../utils/cookies';
import {
    ApiForgotPassRequestAction, ApiForgotPassSuccessAction, ApiForgotPassFailedAction,
    ApiIngredientsRequestAction, ApiIngredientsSuccessAction, ApiIngredientsFailedAction,
    ApiLoginRequestAction, ApiLoginSuccessAction, ApiLoginFailedAction,
    ApiOrderRequestAction, ApiOrderSuccessAction, ApiOrderFailedAction,
    ApiRegUserRequestAction, ApiRegUserSuccessAction, ApiRegUserFailedAction,
    ApiResetPassRequestAction, ApiResetPassSuccessAction, ApiResetPassFailedAction,
    ApiLogoutRequestAction, ApiLogoutSuccessAction, ApiLogoutFailedAction
} from '../actions/api-actions';

export const apiIngredientsReducer = apiReducerCreator(ApiIngredientsRequestAction, ApiIngredientsSuccessAction, ApiIngredientsFailedAction);
export const apiOrderReducer = apiReducerCreator(ApiOrderRequestAction, ApiOrderSuccessAction, ApiOrderFailedAction);

export const apiRegUserReducer = apiReducerCreator(ApiRegUserRequestAction, ApiRegUserSuccessAction, ApiRegUserFailedAction);
export const apiLoginReducer = apiReducerCreator(ApiLoginRequestAction, ApiLoginSuccessAction, ApiLoginFailedAction);

export const apiForgotPasswordReducer = apiReducerCreator(ApiForgotPassRequestAction, ApiForgotPassSuccessAction, ApiForgotPassFailedAction);
export const apiResetPasswordReducer = apiReducerCreator(ApiResetPassRequestAction, ApiResetPassSuccessAction, ApiResetPassFailedAction);

export const apiLogoutReducer = apiReducerCreator(ApiLogoutRequestAction, ApiLogoutSuccessAction, ApiLogoutFailedAction);
