import { internalUserReducer } from './internal-user';
import { ClearUserAction, SetUserAction, SetUserLogged, SetUserPasswordReseted, SetUserTryResetPassword } from '../actions/internal-user';
import { getCookie } from '../../utils/cookies';
import { IUserInfo } from '../../utils/common-types/interfaces';

const initStore = {
    userInfo: null,
    isLogged: !!getCookie('accessToken'),
    isTryResetPassword: false
};

const userInfo: IUserInfo = {
    success: true,
    user: {
        email: 'test@test.test',
        name: 'Test',
    }
}

describe('test user actions', () => {
    it('should return the initial state', () => {
        expect(internalUserReducer(undefined, { type: undefined })).toEqual(initStore)
    });

    it('should set user is logged', () => {
        expect(internalUserReducer(initStore, SetUserLogged()))
            .toEqual({ ...initStore, isLogged: true })
    });

    it('should set user info', () => {
        expect(internalUserReducer(initStore, SetUserAction(userInfo)))
            .toEqual({ ...initStore, userInfo: userInfo })
    });

    it('should clear user info', () => {
        expect(internalUserReducer(initStore, ClearUserAction()))
            .toEqual({ ...initStore, userInfo: null, isLogged: !!getCookie('accessToken') })
    });

    it('should set user try reset password', () => {
        expect(internalUserReducer(initStore, SetUserTryResetPassword()))
            .toEqual({ ...initStore, isTryResetPassword: true })
    });

    it('should set user password is reseted', () => {
        expect(internalUserReducer(initStore, SetUserPasswordReseted()))
            .toEqual({ ...initStore, isTryResetPassword: false })
    });
})