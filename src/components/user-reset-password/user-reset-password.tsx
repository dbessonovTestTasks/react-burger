import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SetUserPasswordReseted } from '../../services/actions/internal-user';
import { resetPassAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';
import LoaderButton from '../loader-button/loader-button';
import styles from './user-reset-password.module.css';

function UserResetPassword() {
    const navigate = useNavigate();
    const [letterCode, setLetterCode] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const resetPasswordStore = useSelector(o => o.resetPassword);
    const isTryResetPassword = useSelector(store => store.internalUser.isTryResetPassword);

    useEffect(() => {
        if (!resetPasswordStore.answer?.success && !isTryResetPassword)
            navigate('/forgot-password');
    }, [resetPasswordStore.answer?.success, isTryResetPassword, navigate]);

    useEffect(() => {
        if (resetPasswordStore.answer?.success) {
            dispatch(SetUserPasswordReseted());
            navigate('/login');
        }
    }, [resetPasswordStore.answer?.success, navigate]);

    const handleSavePassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassAction({ password: password, token: letterCode }));
    };

    return (<div className={styles.container}>
        <form onSubmit={handleSavePassword} className='mb-20'>
            <p className={`text text_type_main-medium ${styles.mb30}`}>Восстановленние пароля</p>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                name={'password'}
                extraClass='mb-6'
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setLetterCode(e.target.value)}
                value={letterCode}
                name={'letterCode'}
                size={'default'}
                extraClass='mb-6'
            />
            <LoaderButton htmlType='submit' isDisabled={resetPasswordStore.request} loaderText={'Сохранение...'} text={'Сохранить'}
                errorText={resetPasswordStore.failed ? resetPasswordStore.errorMessage : ''} />
        </form>
        <p className='text text_type_main-default text_color_inactive mb4'>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </div>);
}

export default UserResetPassword;