import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-register.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../hooks/use-selector';
import { loadRegUser } from '../../services/actions/api-actions';
import { useDispatch } from '../hooks/use-dispatch';

function UserRegister() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const registerSuccess = useSelector(o => o.regUser.answer?.success);

    useEffect(() => {
        if (registerSuccess)
            navigate('/login');
    }, [registerSuccess, navigate]);

    const handleRegister = () => {
        dispatch(loadRegUser({
            email: email,
            password: password,
            name: userName
        }));
    };

    return (<div className={styles.container}>
        <p className={`text text_type_main-medium ${styles.mb30}`}>Регистрация</p>
        <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setUserName(e.target.value)}
            value={userName}
            name={'userName'}
            size={'default'}
            extraClass='mb-6'
        />
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
        <Button htmlType='button' type='primary' size='medium' extraClass='mb-20' onClick={handleRegister}>Зарегистрироваться</Button>
        <p className='text text_type_main-default text_color_inactive mb4'>Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link></p>
    </div>);
}

export default UserRegister;