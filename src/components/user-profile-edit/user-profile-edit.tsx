import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { LoaderButton } from '../loader-button/loader-button';
import { getUserAction, patchUserAction } from '../../services/api-actions-generation';
import { AppError } from '../app-error/app-error';
import { RefreshToken } from '../refresh-token/refresh-token';
import { NameInput } from '../name-input/name-input';
import { useForm } from '../hooks/use-form';

export const UserProfileEdit: FC = () => {
    const dispatch = useDispatch();

    const { request: getUserRequest, failed: getUserFailed, errorMessage: getUserErrorMessage } = useSelector(store => store.getUser);
    const { request: patchUserRequest, failed: patchUserFailed, errorMessage: patchUserErrorMessage } = useSelector(store => store.patchUser);

    const internalUser = useSelector(store => store.internalUser);

    const [infoIsChanged, setInfoIsChanged] = useState(false);
    const { values: userForm, handleChange: handleUserFormChange, setValues: setUserFormValues }
        = useForm({ userName: '', email: '', password: '' });

    const setDefaultUserInfo = () => {
        setUserFormValues({ userName: internalUser.userInfo?.user.name ?? '', email: internalUser.userInfo?.user.email ?? '', password: '' })
        setInfoIsChanged(false);
    }

    const getUser = () => { dispatch(getUserAction()); };

    useEffect(() => {
        if (internalUser.isLogged && internalUser.userInfo == null)
            getUser();
    }, []);

    useEffect(() => {
        setDefaultUserInfo();
    }, [internalUser.userInfo?.user]);

    const onInfoChange = (action: () => void) => {
        setInfoIsChanged(true);
        action();
    }

    useEffect(() => {
        if (!patchUserRequest && !patchUserFailed)
            setInfoIsChanged(false);
    }, [patchUserRequest]);

    //const [debug_expireToken, debug_setExpireToken] = useState(true);    
    const handlePatchUser = (e: FormEvent<HTMLFormElement> | null) => {
        e?.preventDefault();
        // if (debug_expireToken) {
        //     setTokens('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBjMTA5OTM2YjE3MDAxYmU1OWJhMSIsImlhdCI6MTY3NTk1MjM4MSwiZXhwIjoxNjc1OTUzNTgxfQ.FnWbqNSTeWRf7TfNXoM_6drpa-UjMeLV4yKpZJiL9Go', localStorage.getItem('refreshToken')!);
        //     debug_setExpireToken(false);
        // }
        dispatch(patchUserAction({ email: userForm.email, password: userForm.password, name: userForm.userName }));
    }

    const formSubmit = () => {
        return (<form onSubmit={handlePatchUser} className='mb-20'>
            <NameInput
                onChange={e => onInfoChange(() => handleUserFormChange(e))}
                value={userForm.userName}
                name={'userName'}
                size={'default'}
                extraClass='mb-6' />
            <EmailInput
                onChange={e => onInfoChange(() => handleUserFormChange(e))}
                value={userForm.email}
                name={'email'}
                isIcon={true}
                extraClass='mb-6' />
            <PasswordInput
                onChange={e => onInfoChange(() => handleUserFormChange(e))}
                value={userForm.password}
                name={'password'}
                icon='EditIcon'
                extraClass='mb-6' />
            {infoIsChanged && (<>
                <Button htmlType='button' type='primary' extraClass='mr-2' onClick={setDefaultUserInfo}>Отменить</Button>
                <LoaderButton htmlType='submit' isDisabled={patchUserRequest} text='Сохранить' loaderText='Сохранение...'
                    errorText={patchUserFailed ? patchUserErrorMessage : ''} />
            </>)}
        </form>)
    }

    return (getUserFailed || patchUserFailed
        ? (getUserErrorMessage === 'jwt expired' || patchUserErrorMessage === 'jwt expired'
            ? (<RefreshToken repeatableAction={getUserFailed ? getUser : () => handlePatchUser(null)} />)
            : (<AppError errorMessage={getUserErrorMessage + patchUserErrorMessage} />))
        : (getUserRequest
            ? <LoaderButton htmlType='button' isDisabled={getUserRequest} text='Обновить информацию о пользователе'
                loaderText='Обновление информации о пользователе...'
                errorText={getUserFailed ? getUserErrorMessage : ''} />
            : formSubmit()));
}