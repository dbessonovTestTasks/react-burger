import {IBurgerIngredient} from '../../utils/common-types/interfaces';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import TabsIngredients from '../tabs-ingredients/tabs-ingredients';
import  styles from './burger-ingredients.module.css';
import {IngridientTypes} from '../../utils/common-types/constants';

interface IProps {
    ingredients: IBurgerIngredient[];
}

function BurgerIngredients(props: IProps){
    return (<div>
                <div className={styles.leftText}>
                    <p className='text text_type_main-large mb-5'>Соберите бургер</p>
                </div>
                <TabsIngredients/>
                <div className={styles.tabContainer}>
                    <div className={`${styles.leftText} mt-8`}>
                        <p className='text text_type_main-medium'>Булки</p>
                    </div>
                    <div className={styles.ingredientsContainer}>
                        {props.ingredients.filter(o=>o.type===IngridientTypes.Bun).map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                    </div>
                    <div className={`${styles.leftText} mt-8`}>
                        <p className='text text_type_main-medium'>Соусы</p>
                    </div>
                    <div className={styles.ingredientsContainer}>                            
                        {props.ingredients.filter(o=>o.type===IngridientTypes.Sauce).map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                    </div>   
                    <div className={`${styles.leftText} mt-8`}>
                        <p className='text text_type_main-medium'>Начинки</p>
                    </div>  
                    <div className={styles.ingredientsContainer}>
                        {props.ingredients.filter(o=>o.type===IngridientTypes.Main).map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                    </div>     
                </div>             
            </div>
    );
}

export default BurgerIngredients