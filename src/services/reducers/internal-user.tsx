import { IUserInfo } from '../../utils/common-types/interfaces';
import { createReducer } from '@reduxjs/toolkit';
import { ClearUserAction, SetUserAction, SetUserLogged, SetUserPasswordReseted, SetUserTryResetPassword } from '../actions/internal-user';
import { getCookie } from '../../utils/cookies';

interface IIternalUserStore {
    userInfo: IUserInfo | null;
    isLogged: boolean;
    isTryResetPassword: boolean;
}

const initInternalUserStore: IIternalUserStore = {
    userInfo: null,
    isLogged: !!getCookie('accessToken'),
    isTryResetPassword: false
};

export const internalUserReducer = createReducer(initInternalUserStore, (builder) =>
    builder
        .addCase(SetUserLogged, (state) => {
            return { ...state, isLogged: true };
        })
        .addCase(SetUserAction, (state, action) => {
            return { ...state, userInfo: action.payload };
        })
        .addCase(ClearUserAction, (state) => {            
            return { ...state, userInfo: null, isLogged: !!getCookie('accessToken') };
        })
        .addCase(SetUserTryResetPassword, (state) => {
            return { ...state, isTryResetPassword: true };
        })
        .addCase(SetUserPasswordReseted, (state) => {
            return { ...state, isTryResetPassword: false };
        }));