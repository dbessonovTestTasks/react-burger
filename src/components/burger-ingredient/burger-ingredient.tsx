import React from 'react'
import {IBurgerIngredient,} from '../../utils/common-types/interfaces';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './burger-ingredient.module.css';

interface IProps {
    ingredient: IBurgerIngredient;
}

function BurgerIngredient(props: IProps) {
    return (
        <div className={`${styles.ingredientCard} mt-6 ml-4 mb-2 mr-2`}>
            {props.ingredient.__v>0
                ?<Counter count={props.ingredient.__v} size='default'  />
                :null}
            <img className='ml-4 mr-4 mb-1' src={props.ingredient.image} alt={props.ingredient.name} />
            <div className={`${styles.flexCenter} mt-1 mb-1`}>
                <span className='text text_type_digits-default mr-2'>{props.ingredient.price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <div  className={styles.ingredientName}>
                <p>{props.ingredient.name}</p>
            </div>
        </div>
    );
}

export default BurgerIngredient