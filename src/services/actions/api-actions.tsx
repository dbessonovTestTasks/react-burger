import { apiActionCreator } from '../../utils/api-action-creator';
import { IMessageAnswer, IBurgerIngredient, ILoginUserParams, IUserAuthInfo, IBurgerOrder, IRegisterUserParams, IResetPasswordParams } from '../../utils/common-types/interfaces';
import { getIngredientsDataApi, loginApi, forgorPasswordApi, createOrderApi, registerUserApi, resetPasswordApi, logoutApi } from '../../utils/api-requests';
import { ClearBurgerIngredients } from './constructor-ingredients';
import { setCookie } from '../../utils/cookies';

export const [ApiIngredientsRequestAction, ApiIngredientsSuccessAction, ApiIngredientsFailedAction, loadIngredients]
    = apiActionCreator<{ data: IBurgerIngredient[] }, void>('API_INGREDIENTS', getIngredientsDataApi);

export const [ApiOrderRequestAction, ApiOrderSuccessAction, ApiOrderFailedAction, createOrder]
    = apiActionCreator<IBurgerOrder, string[]>('API_ORDER', createOrderApi, ClearBurgerIngredients);


export const [ApiRegUserRequestAction, ApiRegUserSuccessAction, ApiRegUserFailedAction, loadRegUser]
    = apiActionCreator<IUserAuthInfo, IRegisterUserParams>('API_REGUSER', registerUserApi);

export const [ApiLoginRequestAction, ApiLoginSuccessAction, ApiLoginFailedAction, loadLogin]
    = apiActionCreator<IUserAuthInfo, ILoginUserParams>('API_LOGIN', loginApi, null, (data) => {
        setCookie('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    });

export const [ApiLogoutRequestAction, ApiLogoutSuccessAction, ApiLogoutFailedAction, loadLogout]
    = apiActionCreator<IUserAuthInfo, void>('API_LOGOUT', logoutApi);


export const [ApiForgotPassRequestAction, ApiForgotPassSuccessAction, ApiForgotPassFailedAction, loadForgotPass]
    = apiActionCreator<IMessageAnswer, string>('API_FORGOTPASS', forgorPasswordApi);

export const [ApiResetPassRequestAction, ApiResetPassSuccessAction, ApiResetPassFailedAction, loadResetPass]
    = apiActionCreator<IMessageAnswer, IResetPasswordParams>('API_RESETPASS', resetPasswordApi);