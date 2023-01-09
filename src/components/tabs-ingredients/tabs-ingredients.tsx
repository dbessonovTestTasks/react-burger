import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './tabs-ingredients.module.css';

interface IProps {    
}

function TabsIngredients(props: IProps){
    return (
        <div className={`${styles.tabHeader} mb-2`}>
            <Tab value="Булки" active={true} onClick={()=>{}}>
                Булки
            </Tab>
            <Tab value="Соусы" active={false} onClick={()=>{}}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={false} onClick={()=>{}}>
                Начинки
            </Tab>
        </div>            
    )
}

export default TabsIngredients