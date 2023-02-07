import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-login.module.css';
import { useNavigate } from "react-router-dom";

function UserLogin() {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
    };

    return (<div className={styles.container}>
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
        <Button htmlType='button' type='primary' size='medium' extraClass='mb-20' onClick={handleLogin}>Войти</Button>
        <p className='text text_type_main-default text_color_inactive mb4'>Вы - новый пользователь? <Link to='/register'>Зарегистриваться</Link></p>
        <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
    </div>);
}

export default UserLogin;