import { tabsIngredientReducer } from './tabs-ingredients';
import { ChangeActiveTabAction } from '../actions/tabs-ingredients';
import { tabList } from '../../utils/common-types/constants';

const initPopupedIndredientStore = {
    activeTabName: tabList.BunTab
};

describe('test change tabs ingredients', () => {
    it('should return the initial state', () => {
        expect(tabsIngredientReducer(undefined, { type: undefined })).toEqual(initPopupedIndredientStore)
    })

    it('should change tab name', () => {
        expect(tabsIngredientReducer(initPopupedIndredientStore, ChangeActiveTabAction(tabList.MainTab)))
            .toEqual({ activeTabName: tabList.MainTab })
    })
})