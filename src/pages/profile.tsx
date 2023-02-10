import { Link, matchPath, Outlet, useLocation } from "react-router-dom";
import styles from './profile.module.css';


export function ProfilePage() {
    const { pathname } = useLocation();    
    const profileIsInactive = !matchPath(pathname, '/profile');
    const ordersIsInactive = !matchPath(pathname, '/profile/orders');
    const logoutIsInactive = !matchPath(pathname, '/profile/logout');    
    const colorType = (isInactive:boolean)=>isInactive?'text_color_inactive':'';

    return (<div className={styles.container}>
        <div className={`${styles.leftSubContainer}`}>
            <Link to={'/profile'} className={`text text_type_main-medium ${colorType(profileIsInactive)}`}><p>Профиль</p></Link>
            <Link to={'/profile/orders'} className={`text text_type_main-medium ${colorType(ordersIsInactive)} `}><p>История заказов</p></Link>
            <Link to={'/profile/logout'} className={`text text_type_main-medium ${colorType(logoutIsInactive)} mb-20`}><p>Выход</p></Link>
            <p className={`text text_type_main-default text_color_inactive ${styles.opacity}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <div className={styles.centerSubContainer}>
            <Outlet />
        </div>
    </div>);
}