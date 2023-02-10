import { IUserInfo } from '../../utils/common-types/interfaces';
import { createAction } from '@reduxjs/toolkit';
import { withPayloadType } from '../../utils/api-action-creator';

export const SetUserLogged = createAction('SET_USER_LOGGED');
export const SetUserTryResetPassword = createAction('SET_USER_TRY_RESET_PASSWORD');
export const SetUserPasswordReseted = createAction('SET_USER_PASSWORD_RESETED');
export const SetUserAction = createAction('SET_USER', withPayloadType<IUserInfo>());
export const ClearUserAction = createAction('CLEAR_USER');