import { popupedIndredientReducer } from './popuped-ingredient';
import { AddPopupIngredientsAction, RemovePopupIngredientsAction } from '../actions/popuped-ingredient';
import { IBurgerIngredient } from '../../utils/common-types/interfaces';

const initStore = {
    popupedIndredient: null
};

const burgerIngredient: IBurgerIngredient = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 1
}

describe('test popup ingredient', () => {
    it('should return the initial state', () => {
        expect(popupedIndredientReducer(undefined, { type: undefined })).toEqual(initStore)
    })

    it('should set new ingredient', () => {
        expect(popupedIndredientReducer(initStore, AddPopupIngredientsAction(burgerIngredient)))
            .toEqual({ popupedIndredient: burgerIngredient })
    })

    it('should clear ingredient', () => {
        expect(popupedIndredientReducer(initStore, RemovePopupIngredientsAction()))
            .toEqual(initStore)
    })
})