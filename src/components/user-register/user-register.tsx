import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-register.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../hooks/use-selector';
import { registerUserAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import LoaderButton from '../loader-button/loader-button';

function UserRegister() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const regUser = useSelector(o => o.regUser);

    useEffect(() => {
        if (regUser.answer?.success)
            navigate('/login');
    }, [regUser.answer?.success, navigate]);

    const handleRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerUserAction({
            email: email,
            password: password,
            name: userName
        }));
    };

    return (<div className={styles.container}>
        <form onSubmit={handleRegister} className='mb-20'>
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
            <LoaderButton htmlType='submit'
                text='Зарегистрироваться' loaderText='Pегистрация...' isDisabled={regUser.request}
                errorText={regUser.failed ? regUser.errorMessage : ''} />
        </form>
        <p className='text text_type_main-default text_color_inactive mb4'>Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link></p>
    </div>);
}

export default UserRegister;