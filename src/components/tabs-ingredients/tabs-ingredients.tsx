import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './tabs-ingredients.module.css';
import { useState } from 'react';

interface IProps { 
    bunPartRef: React.MutableRefObject<null | HTMLDivElement>;  
    saucePartRef: React.MutableRefObject<null | HTMLDivElement>;
    mainPartRef: React.MutableRefObject<null | HTMLDivElement>;
}

function TabsIngredients(props: IProps){
    const [activeTabName, setActiveTabName] = useState('bunTab');
    
    const changeTab = (tabName: string, refToDiv: React.MutableRefObject<null | HTMLDivElement>) => {
        refToDiv.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        setActiveTabName(tabName);
    }

    return (
        <div className={`${styles.tabHeader} mb-2`}>
            <Tab value='bunTab' active={activeTabName === 'bunTab'} onClick={(tabName)=>changeTab(tabName, props.bunPartRef)}>
                Булки
            </Tab>
            <Tab value='sauceTab' active={activeTabName === 'sauceTab'} onClick={(tabName)=>changeTab(tabName, props.saucePartRef)}>
                Соусы
            </Tab>
            <Tab value='mainTab' active={activeTabName === 'mainTab'} onClick={(tabName)=>changeTab(tabName, props.mainPartRef)}>
                Начинки
            </Tab>
        </div>            
    )
}

export default TabsIngredients