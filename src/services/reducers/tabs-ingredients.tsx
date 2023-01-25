import { TabList } from '../../utils/common-types/constants';
import { ChangeActiveTabAction } from '../actions/tabs-ingredients';
import { createReducer } from '@reduxjs/toolkit';

interface ITabsIngredientStore {
    activeTabName: string;
}

const initPopupedIndredientStore: ITabsIngredientStore = {
    activeTabName: TabList.BunTab
};

export const tabsIngredientReducer = createReducer(initPopupedIndredientStore, (builder) =>
    builder.addCase(ChangeActiveTabAction, (state, action) => {
        return { activeTabName: action.payload };
    }));