import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loadResetPass } from '../../services/actions/api-actions';
import { useDispatch } from '../hooks/use-dispatch';
import styles from './user-reset-password.module.css';

function UserResetPassword() {
    const [letterCode, setLetterCode] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const handleSavePassword = () => {
        dispatch(loadResetPass({password: password, token:letterCode}));        
    };

    return (<div className={styles.container}>
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
        <Button htmlType='button' type='primary' size='medium' extraClass='mb-20' onClick={handleSavePassword}>Сохранить</Button>
        <p className='text text_type_main-default text_color_inactive mb4'>Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link></p>
    </div>);
}

export default UserResetPassword;