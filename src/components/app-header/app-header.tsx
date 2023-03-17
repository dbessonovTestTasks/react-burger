import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { matchPath, useLocation } from 'react-router-dom';
import { FC } from 'react';

export const AppHeader: FC = () => {
    const { pathname } = useLocation();
    const ordersIsInactive = !matchPath(pathname, '/feed');
    const profileIsInactive = !matchPath({path: '/profile/*'}, pathname);
    const constructorIsInactive = !matchPath(pathname, '/');

    const iconType = (isInactive: boolean) => isInactive ? 'secondary' : 'primary';
    const colorType = (isInactive: boolean) => isInactive ? 'text_color_inactive' : '';

    return (
        <header>
            <div className={styles.appHeader}>
                <div className={styles.logo}>
                    <Link to='/'><Logo /></Link>
                </div>
                <nav className={styles.navbar}>
                    <div className='pl-5 pr-7 pt-4 pb-4'>
                        <BurgerIcon type={iconType(constructorIsInactive)} />
                        <Link to={'/'} className={`pl-2 text text_type_main-default ${colorType(constructorIsInactive)}`}>Конструктор</Link>
                    </div>
                    <div className='pl-5 pr-5 pt-4 pb-4'>
                        <ListIcon type={iconType(ordersIsInactive)} />
                        <Link to={'/feed'} className={`pl-2 text text_type_main-default ${colorType(ordersIsInactive)}`}>Лента заказов</Link>
                    </div>
                    <div className={`pl-5 pr-5 pt-4 pb-4 ${styles.floatRight}`}>
                        <ProfileIcon type={iconType(profileIsInactive)} />
                        <Link to={'/profile/orders'} className={`pl-2 text text_type_main-default ${colorType(profileIsInactive)}`}>Личный кабинет</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}