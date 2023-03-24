import { constructorIngredientsReducer } from './constructor-ingredients';
import { ChangeBunAction, AddIngredientToBurgerAction, RemoveIngredientFromBurgerAction, ChangeIngredientsOrderAction, ClearBurgerIngredients } from '../actions/constructor-ingredients';
import { TConstructorIngredient } from '../../utils/common-types/interfaces';

const initStore = {
    bun: null,
    notBunIngredients: []
};

const bun: TConstructorIngredient = {
    key: '1q2w3e4r',
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

describe('test cinstructor actions', () => {
    it('should return the initial state', () => {
        expect(constructorIngredientsReducer(undefined, { type: undefined })).toEqual(initStore)
    });

    it('should change bun', () => {
        expect(constructorIngredientsReducer(initStore, ChangeBunAction(bun)))
            .toEqual({ ...initStore, bun: bun })
    });

    it('should add ingredient', () => {
        expect(constructorIngredientsReducer(initStore, AddIngredientToBurgerAction(bun)))
            .toEqual({ ...initStore, notBunIngredients: [bun] })
    });

    it('should remove ingredient', () => {
        expect(constructorIngredientsReducer({ ...initStore, notBunIngredients: [bun] }, RemoveIngredientFromBurgerAction(bun.key)))
            .toEqual(initStore)
    });

    it('should clear ingredients', () => {
        expect(constructorIngredientsReducer({ ...initStore, notBunIngredients: [bun] }, ClearBurgerIngredients()))
            .toEqual(initStore)
    });

    it('should exchange position', () => {
        expect(constructorIngredientsReducer({ ...initStore, notBunIngredients: [bun, { ...bun, key: '1' }] },
            ChangeIngredientsOrderAction({ dragIndex: 1, hoverIndex: 0, })))
            .toEqual({ ...initStore, notBunIngredients: [{ ...bun, key: '1' }, bun] })
    });
})