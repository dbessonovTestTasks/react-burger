import { TBurgerIngredient } from '../../utils/common-types/interfaces';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import TabsIngredients from '../tabs-ingredients/tabs-ingredients';
import styles from './burger-ingredients.module.css';
import { IngridientTypes, TabList } from '../../utils/common-types/constants';
import { useMemo, useEffect, useCallback } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { loadIngredients } from '../../services/actions/api-ingredients';
import { useNavigationBlock } from '../hooks/use-navigation-block';
import { ChangeActiveTabAction } from '../../services/actions/tabs-ingredients';

function BurgerIngredients() {
    const dispatch = useDispatch();

    const [bunPartRef, bunScroll, isBunVisible] = useNavigationBlock();
    const [saucePartRef, sauceScroll, isSauceVisible] = useNavigationBlock();
    const [mainPartRef, mainScroll, isMainVisible] = useNavigationBlock();

    useEffect(() => {
        dispatch(ChangeActiveTabAction(isBunVisible ? TabList.BunTab : (isSauceVisible ? TabList.SauceTab : TabList.MainTab)));
    }, [dispatch, isBunVisible, isSauceVisible, isMainVisible]);

    const ingredients = useSelector(store => store.apiIngredients.ingredients.map(o => ({ ...o, count: 0 }) as TBurgerIngredient));

    const bunIngredients = useMemo(() => ingredients.filter(o => o.type === IngridientTypes.Bun), [ingredients]);
    const sauceIngredients = useMemo(() => ingredients.filter(o => o.type === IngridientTypes.Sauce), [ingredients]);
    const mainIngredients = useMemo(() => ingredients.filter(o => o.type === IngridientTypes.Main), [ingredients]);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [useDispatch]);

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
                    {bunIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} />))}
                </div>
                <div className={`${styles.leftText} mt-8`} ref={saucePartRef}>
                    <p className='text text_type_main-medium'>Соусы</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    {sauceIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} />))}
                </div>
                <div className={`${styles.leftText} mt-8`} ref={mainPartRef}>
                    <p className='text text_type_main-medium'>Начинки</p>
                </div>
                <div className={styles.ingredientsContainer}>
                    {mainIngredients.map(ingredient => (<BurgerIngredient ingredient={ingredient} count={ingredient.count} />))}
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients