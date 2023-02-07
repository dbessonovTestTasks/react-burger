import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-profile.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from '../hooks/use-selector';
import { loadRegUser } from '../../services/actions/api-actions';
import { useDispatch } from '../hooks/use-dispatch';

function UserProfile() {
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

    return (
        <div className={styles.container}>
            <div className={`${styles.leftSubContainer}`}>
                <Link to={'/profile'} className={`text text_type_main-medium`}><p>Профиль</p></Link>
                <Link to={'/profile/orders'} className={`text text_type_main-medium text_color_inactive`}><p>История заказов</p></Link>
                <Link to={'/logout'} className={`text text_type_main-medium text_color_inactive mb-20`}><p>Выход</p></Link>
                <p className={`text text_type_main-default text_color_inactive ${styles.opacity}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={styles.centerSubContainer}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    name={'userName'}
                    size={'default'}
                    icon='EditIcon'
                    extraClass='mb-6'/>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={true}
                    extraClass='mb-6'/>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    icon='EditIcon'
                    extraClass='mb-6'/>
            </div>
        </div>);
}

export default UserProfile;