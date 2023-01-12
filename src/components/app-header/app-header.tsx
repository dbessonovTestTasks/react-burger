import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './app-header.module.css';

function AppHeader() {

    return (
        <header>
            <div className={styles.appHeader}>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <nav className={styles.navbar}>
                    <div className='pl-5 pr-7 pt-4 pb-4'>
                        <BurgerIcon type='primary' />
                        <a className='pl-2 text text_type_main-default'>Конструктор</a>
                    </div>
                    <div className='pl-5 pr-5 pt-4 pb-4'>
                        <ListIcon type='secondary'  />
                        <a className='pl-2 text text_type_main-default text_color_inactive'>Лента заказов</a>
                    </div>                    
                    <div className='pl-5 pr-5 pt-4 pb-4' style={{float:'right'}}>
                        <ProfileIcon type='secondary' />
                        <a className='pl-2 text text_type_main-default text_color_inactive'>Личный кабинет</a>
                    </div> 
                </nav>
            </div>                
        </header>
    );   
}

export default AppHeader