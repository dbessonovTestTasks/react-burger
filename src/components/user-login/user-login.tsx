import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './user-login.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../hooks/use-selector';
import { loginAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import { LoaderButton } from '../loader-button/loader-button';

export const UserLogin: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginStore = useSelector(o => o.login);
    const { state } = useLocation();
    const dispatch = useDispatch();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAction({ email, password }));
    };
    const userIsLogged = useSelector(store => store.internalUser.isLogged);

    useEffect(() => {
        if (userIsLogged)
            navigate(!!state?.redirectTo && state?.redirectTo !== '/profile/logout' ? state.redirectTo : '/');
    // eslint-disable-next-line
    }, [userIsLogged, navigate, dispatch]);//при смене userIsLogged

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className='mb-20'>
                <p className={`text text_type_main-medium ${styles.mb30}`}>Вход</p>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    extraClass='mb-6'
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass='mb-6'
                />
                <LoaderButton htmlType='submit' isDisabled={loginStore.request} text='Войти' loaderText='Вход...'
                    errorText={loginStore.failed ? loginStore.errorMessage : ''} />
            </form>
            <p className='text text_type_main-default text_color_inactive mb4'>Вы - новый пользователь? <Link to='/register'>Зарегистриваться</Link></p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
        </div>);
}