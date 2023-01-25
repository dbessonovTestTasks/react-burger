import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-ingredients.module.css';
import { useState } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { CHANGE_ACTIVE_TAB } from '../../services/actions/tabs-ingredients';
import { TabList } from '../../utils/common-types/constants';

interface IProps {
    bunScroll: () => void;
    sauceScroll: () => void;
    mainScroll: () => void;
}

function TabsIngredients(props: IProps) {
    const dispatch = useDispatch();
    const { activeTabName } = useSelector(store => store.tabsIngredient);

    const changeTab = (tabName: string, scrollToDiv: () => void) => {
        scrollToDiv();
        dispatch({ type: CHANGE_ACTIVE_TAB, payload: tabName });
    }

    return (
        <div className={`${styles.tabHeader} mb-2`}>
            <Tab value={TabList.BunTab} active={activeTabName === TabList.BunTab} onClick={(tabName) => changeTab(tabName, props.bunScroll)}>
                Булки
            </Tab>
            <Tab value={TabList.SauceTab} active={activeTabName === TabList.SauceTab} onClick={(tabName) => changeTab(tabName, props.sauceScroll)}>
                Соусы
            </Tab>
            <Tab value={TabList.MainTab} active={activeTabName === TabList.MainTab} onClick={(tabName) => changeTab(tabName, props.mainScroll)}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabsIngredients