import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-forgot-password.module.css';
import { useNavigate } from "react-router-dom";
import { loadForgotPass } from '../../services/actions/api-actions';
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';

function UserForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const passwordSuccess = useSelector(o => o.forgotPassword.answer?.success);
    const dispatch = useDispatch();

    useEffect(() => {
        if (passwordSuccess)
            navigate('/reset-password');
    }, [passwordSuccess]);

    const handleForgotPassword = () => {
        dispatch(loadForgotPass(email));        
    };

    return (<div className={styles.container}>
        <p className={`text text_type_main-medium ${styles.mb30}`}>Восстановленние пароля</p>
        <EmailInput
            placeholder='Укажите e-mail'
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            isIcon={false}
            extraClass='mb-6'
        />
        <Button htmlType='button' type='primary' size='medium' extraClass='mb-20' onClick={handleForgotPassword}>Восстановить</Button>
        <p className='text text_type_main-default text_color_inactive mb4'>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </div>);
}

export default UserForgotPassword;