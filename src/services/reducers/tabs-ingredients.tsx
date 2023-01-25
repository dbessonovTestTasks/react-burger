import { TabList } from '../../utils/common-types/constants';
import {
    CHANGE_ACTIVE_TAB,
    TChangeActiveTabAction
} from '../actions/tabs-ingredients';


interface ITabsIngredientStore { 
    activeTabName: string;
}

const initPopupedIndredientStore: ITabsIngredientStore = {
    activeTabName: TabList.BunTab
};

export const tabsIngredientReducer = (state = initPopupedIndredientStore, action: TChangeActiveTabAction): ITabsIngredientStore => {
    switch (action.type) {
        case CHANGE_ACTIVE_TAB: {
            return { activeTabName: action.payload };
        }
        default: {
            return state;
        }
    }
};