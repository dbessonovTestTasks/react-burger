import { Link } from 'react-router-dom';
import styles from './user-profile.module.css';
import UserProfileEdit from '../user-profile-edit/user-profile-edit';
import { useSelector } from '../hooks/use-selector';

function UserProfile() {
    const internalUser = useSelector(store => store.internalUser);
    

    return (
        <div className={styles.container}>
            <div className={`${styles.leftSubContainer}`}>
                <Link to={'/profile'} className={`text text_type_main-medium`}><p>Профиль</p></Link>
                <Link to={'/profile/orders'} className={`text text_type_main-medium text_color_inactive`}><p>История заказов</p></Link>
                <Link to={'/logout'} className={`text text_type_main-medium text_color_inactive mb-20`}><p>Выход</p></Link>
                <p className={`text text_type_main-default text_color_inactive ${styles.opacity}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={styles.centerSubContainer}>
                <UserProfileEdit />
            </div>
        </div>);
}

export default UserProfile;