import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs-ingredients.module.css';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { ChangeActiveTabAction } from '../../services/actions/tabs-ingredients';
import { tabList } from '../../utils/common-types/constants';

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
        dispatch(ChangeActiveTabAction(tabName));
    }

    return (
        <div className={`${styles.tabHeader} mb-2`}>
            <Tab value={tabList.BunTab} active={activeTabName === tabList.BunTab} onClick={(tabName) => changeTab(tabName, props.bunScroll)}>
                Булки
            </Tab>
            <Tab value={tabList.SauceTab} active={activeTabName === tabList.SauceTab} onClick={(tabName) => changeTab(tabName, props.sauceScroll)}>
                Соусы
            </Tab>
            <Tab value={tabList.MainTab} active={activeTabName === tabList.MainTab} onClick={(tabName) => changeTab(tabName, props.mainScroll)}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabsIngredients