import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {IBurgerIngredient, BurgerIngredientPropTypes} from '../common/interfaces';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import  styles from './burger-ingredients.module.css';

interface IProps {
    ingredients: IBurgerIngredient[];
}

class BurgerIngredients extends React.Component<IProps> {
    public static propTypes = { ingredients: PropTypes.arrayOf(BurgerIngredientPropTypes).isRequired };

    renderTabs() {
        return (
            <div className={`${styles.tabHeader} mb-2`}>
                <Tab value="Булки" active={true} onClick={()=>{}}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={false} onClick={()=>{}}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={false} onClick={()=>{}}>
                    Начинки
                </Tab>
            </div>            
        )
    }

    render() {
        return (<div>
                    <div className={styles.leftText}>
                        <p className='text text_type_main-large mb-5'>Соберите бургер</p>
                    </div>
                    {this.renderTabs()}
                    <div className={styles.tabContainer}>
                        <div className={`${styles.leftText} mt-8`}>
                            <p className='text text_type_main-medium'>Булки</p>
                        </div>
                        <div className={styles.ingredientsContainer}>
                            {this.props.ingredients.filter(o=>o.type==='bun').map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                        </div>
                        <div className={`${styles.leftText} mt-8`}>
                            <p className='text text_type_main-medium'>Соусы</p>
                        </div>
                        <div className={styles.ingredientsContainer}>                            
                            {this.props.ingredients.filter(o=>o.type==='sauce').map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                        </div>   
                        <div className={`${styles.leftText} mt-8`}>
                            <p className='text text_type_main-medium'>Начинки</p>
                        </div>  
                        <div className={styles.ingredientsContainer}>
                            {this.props.ingredients.filter(o=>o.type==='main').map(ingredient=>(<BurgerIngredient ingredient={ingredient}/>))}
                        </div>     
                    </div>             
                </div>
        );
    }
}

export default BurgerIngredients