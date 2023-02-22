import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent,  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-forgot-password.module.css';
import { useNavigate } from "react-router-dom";
import { forgotPassAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';
import { LoaderButton } from '../loader-button/loader-button';
import { SetUserTryResetPassword } from '../../services/actions/internal-user';

export const UserForgotPassword: FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const forgotPasswordStore = useSelector(o => o.forgotPassword);
    const isTryResetPassword = useSelector(store => store.internalUser.isTryResetPassword);

    useEffect(() => {
        if (forgotPasswordStore.answer?.success && isTryResetPassword)
           navigate('/reset-password');
    }, [forgotPasswordStore.answer?.success, isTryResetPassword, navigate]);

    const handleForgotPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!!email)
           {
             dispatch(forgotPassAction(email));
             dispatch(SetUserTryResetPassword());
           }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleForgotPassword} className='mb-20'>
                <p className={`text text_type_main-medium ${styles.mb30}`}>Восстановленние пароля</p>
                <EmailInput
                    placeholder='Укажите e-mail'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    extraClass='mb-6'
                />
                <LoaderButton htmlType='submit' isDisabled={forgotPasswordStore.request} loaderText={'Проверка...'} text={'Восстановить'}
                    errorText={forgotPasswordStore.failed ? forgotPasswordStore.errorMessage : ''} />
            </form>
            <p className='text text_type_main-default text_color_inactive mb4'>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
        </div>);
}