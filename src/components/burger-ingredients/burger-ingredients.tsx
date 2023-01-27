import { TBurgerIngredient } from '../../utils/common-types/interfaces';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import TabsIngredients from '../tabs-ingredients/tabs-ingredients';
import styles from './burger-ingredients.module.css';
import { ingridientTypes, tabList } from '../../utils/common-types/constants';
import { useMemo, useEffect } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { loadIngredients } from '../../services/actions/api-ingredients';
import { useNavigationBlock } from '../hooks/use-navigation-block';
import { ChangeActiveTabAction } from '../../services/actions/tabs-ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { RemovePopupIngredientsAction } from '../../services/actions/popuped-ingredient';
import Modal from '../modal/modal';

function BurgerIngredients() {
    const dispatch = useDispatch();

    const [bunPartRef, bunScroll, isBunVisible] = useNavigationBlock();
    const [saucePartRef, sauceScroll, isSauceVisible] = useNavigationBlock();
    const [mainPartRef, mainScroll, isMainVisible] = useNavigationBlock();

    useEffect(() => {
        dispatch(ChangeActiveTabAction(isBunVisible ? tabList.BunTab : (isSauceVisible ? tabList.SauceTab : tabList.MainTab)));
    }, [dispatch, isBunVisible, isSauceVisible, isMainVisible]);

    const ingredientsFromApi = useSelector(store => store.apiIngredients);
    const addedIngredients = useSelector(store => [...store.constructorIngredients.notBunIngredients,
    store.constructorIngredients.bun, store.constructorIngredients.bun]);
    const ingredients = useMemo(() => ingredientsFromApi.ingredients.map(o =>
        ({ ...o, count: addedIngredients.filter(a => a?._id === o._id).length }) as TBurgerIngredient), [ingredientsFromApi, addedIngredients]);

    const bunIngredients = useMemo(() => ingredients.filter(o => o.type === ingridientTypes.Bun), [ingredients]);
    const sauceIngredients = useMemo(() => ingredients.filter(o => o.type === ingridientTypes.Sauce), [ingredients]);
    const mainIngredients = useMemo(() => ingredients.filter(o => o.type === ingridientTypes.Main), [ingredients]);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    const { popupedIndredient } = useSelector(store => store.popupedIndredient);

    return (
        <div>
            <div className={styles.leftText}>
                <p className='text text_type_main-large mb-5'>Соберите бургер</p>
            </div>
            <TabsIngredients bunScroll={bunScroll} sauceScroll={sauceScroll} mainScroll={mainScroll} />
            <div className={styles.tabContainer}>
                <div className={`${styles.leftText} mt-8`} ref={bunPartRef}>
                    <p className='text text_type_main-medium'>Булки</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    {bunIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} key={ingredient._id} />))}
                </div>
                <div className={`${styles.leftText} mt-8`} ref={saucePartRef}>
                    <p className='text text_type_main-medium'>Соусы</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    {sauceIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} key={ingredient._id} />))}
                </div>
                <div className={`${styles.leftText} mt-8`} ref={mainPartRef}>
                    <p className='text text_type_main-medium'>Начинки</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    {mainIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} key={ingredient._id} />))}
                </div>
            </div>
            {!!popupedIndredient &&
                (<Modal title="Детали ингредиента" onClose={() => dispatch(RemovePopupIngredientsAction())}>
                    <IngredientDetails />
                </Modal>)}
        </div>
    );
}

export default BurgerIngredients