import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import styles from './user-profile-edit.module.css';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import LoaderButton from '../loader-button/loader-button';
import { getUserAction, patchUserAction } from '../../services/api-actions-generation';
import AppError from '../app-error/app-error';
import RefreshToken from '../refresh-token/refresh-token';
import NameInput from '../name-input/name-input';

function UserProfileEdit() {
    const dispatch = useDispatch();

    const { request: getUserRequest, failed: getUserFailed, errorMessage: getUserErrorMessage } = useSelector(store => store.getUser);
    const { request: patchUserRequest, failed: patchUserFailed, errorMessage: patchUserErrorMessage } = useSelector(store => store.patchUser);

    const internalUser = useSelector(store => store.internalUser);

    const [infoIsChanged, setInfoIsChanged] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setDefaultUserInfo = () => {
        setInfoIsChanged(false);
        setUserName(internalUser.userInfo?.user.name ?? '');
        setEmail(internalUser.userInfo?.user.email ?? '');
        setPassword('');
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
    const handlePatchUser = (e: SyntheticEvent | null) => {
        e?.preventDefault();
        // if (debug_expireToken) {
        //     setTokens('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTBjMTA5OTM2YjE3MDAxYmU1OWJhMSIsImlhdCI6MTY3NTk1MjM4MSwiZXhwIjoxNjc1OTUzNTgxfQ.FnWbqNSTeWRf7TfNXoM_6drpa-UjMeLV4yKpZJiL9Go', localStorage.getItem('refreshToken')!);
        //     debug_setExpireToken(false);
        // }
        dispatch(patchUserAction({ email, password, name: userName }));
    }


    const formSubmit = () => {
        return (<form onSubmit={handlePatchUser} className='mb-20'>
            <NameInput
                onChange={e => onInfoChange(() => setUserName(e.target.value))}
                value={userName}
                name={'userName'}
                size={'default'}
                extraClass='mb-6' />
            <EmailInput
                onChange={e => onInfoChange(() => setEmail(e.target.value))}
                value={email}
                name={'email'}
                isIcon={true}
                extraClass='mb-6' />
            <PasswordInput
                onChange={e => onInfoChange(() => setPassword(e.target.value))}
                value={password}
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

export default UserProfileEdit;