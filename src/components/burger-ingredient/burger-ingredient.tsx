import React from 'react'
import {IBurgerIngredient, BurgerIngredientPropTypes} from '../common/interfaces';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './burger-ingredient.module.css';

interface IProps {
    ingredient: IBurgerIngredient;
}

class BurgerIngredient extends React.Component<IProps>  {
    public static propTypes = { ingredient: BurgerIngredientPropTypes.isRequired };

    render() {
        return (
            <div className={`${styles.ingredientCard} mt-6 ml-4 mb-2 mr-2`}>
                {this.props.ingredient.__v>0
                    ?<Counter count={this.props.ingredient.__v} size='default'  />
                    :null}
                <img className='ml-4 mr-4 mb-1' src={this.props.ingredient.image} alt={this.props.ingredient.name} />
                <div className={`${styles.flexCenter} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{this.props.ingredient.price}</span>
                    <CurrencyIcon type='primary' />
                </div>
                <div  className={styles.ingredientName}>
                    <p>{this.props.ingredient.name}</p>
                </div>
            </div>
        );
    }
}

export default BurgerIngredient