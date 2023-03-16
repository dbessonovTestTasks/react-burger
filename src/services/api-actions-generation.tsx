import { apiSliceCreator } from '../utils/api-slice-creator';
import { IMessageAnswer, IBurgerIngredient, ILoginUserParams, IUserAuthInfo, IBurgerOrder, IRegisterUserParams, IResetPasswordParams, IUserInfo, IRefreshTokensInfo, IOrder } from '../utils/common-types/interfaces';
import { getIngredientsDataApi, loginApi, forgorPasswordApi, createOrderApi, registerUserApi, resetPasswordApi, logoutApi, getUserApi, patchUserApi, refreshTokensApi, orderInfoApi } from '../utils/api-requests';
import { ClearBurgerIngredients } from './actions/constructor-ingredients';
import { deleteTokens, setTokens } from '../utils/cookies';
import { ClearUserAction, SetUserAction, SetUserLogged } from './actions/internal-user';

export const [apiIngredientsReducer, loadIngredientsAction] =
    apiSliceCreator<{ data: IBurgerIngredient[] }, void>('API_INGREDIENTS', getIngredientsDataApi);
export const [apiOrderReducer, createOrderAction] =
    apiSliceCreator<IBurgerOrder, string[]>('API_ORDER', createOrderApi, ClearBurgerIngredients);

export const [apiGetUserReducer, getUserAction] =
    apiSliceCreator<IUserInfo, void>('API_GETUSER', getUserApi, SetUserAction);
export const [apiPatchUserReducer, patchUserAction] =
    apiSliceCreator<IUserInfo, IRegisterUserParams>('API_PATCHUSER', patchUserApi, SetUserAction);

export const [apiRegUserReducer, registerUserAction] =
    apiSliceCreator<IUserAuthInfo, IRegisterUserParams>('API_REGUSER', registerUserApi);
export const [apiLoginReducer, loginAction] =
    apiSliceCreator<IUserAuthInfo, ILoginUserParams>('API_LOGIN', loginApi, SetUserLogged, (data) => setTokens(data.accessToken, data.refreshToken));
export const [apiLogoutReducer, logoutAction] =
    apiSliceCreator<IUserInfo, void>('API_LOGOUT', logoutApi, ClearUserAction, () => deleteTokens());

export const [apiForgotPasswordReducer, forgotPassAction] =
    apiSliceCreator<IMessageAnswer, string>('API_FORGOTPASS', forgorPasswordApi);
export const [apiResetPasswordReducer, resetPassAction] =
    apiSliceCreator<IMessageAnswer, IResetPasswordParams>('API_RESETPASS', resetPasswordApi);

export const [apiRefreshTokensReducer, refreshTokensAction] =
    apiSliceCreator<IRefreshTokensInfo, void>('API_REFRESH_TOKEN', refreshTokensApi, null, (data) => setTokens(data.accessToken, data.refreshToken));

export const [apiOrderInfoReducer, orderInfoAction] =
    apiSliceCreator<{ orders: IOrder[] }, string>('API_ORDER_INFO', orderInfoApi);