import React from 'react'
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IBurgerIngredient, BurgerIngredientPropTypes} from '../common/interfaces';
import  styles from './burger-constructor.module.css';

interface IProps {
    ingredients: IBurgerIngredient[];
}


class BurgerConstructor extends React.Component<IProps> {
    public static propTypes = { ingredients: PropTypes.arrayOf(BurgerIngredientPropTypes).isRequired };

    
    render() {
        const targetBun = this.props.ingredients.find(o=>o.type==='bun');
        const totalSum = this.props.ingredients.reduce((s, o)=>s+o.price,0);
        return (<div>
                    <div className={styles.ingidientsContainer}>
                    {!!targetBun&&(<ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${targetBun.name} (верх)`}
                        price={targetBun.price}
                        thumbnail={targetBun.image_mobile}
                        extraClass='ml-6'
                        />)}    
                    <div className={styles.ingidientsSubContainer}>
                        {this.props.ingredients.filter(o=>o.type!=='bun').map(ingredient=>(
                            <div className={`${styles.ingidientBlock} mb-4`}>
                                <DragIcon type='primary' />
                                <ConstructorElement                        
                                isLocked={false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                />
                            </div>
                        ))}
                    </div>                        
                    {!!targetBun&&(<ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${targetBun.name} (низ)`}
                        price={targetBun.price}
                        thumbnail={targetBun.image_mobile}
                        extraClass='ml-6'
                        />)}                            
                    </div>
                    <div className={styles.totalContainer}>
                        <span className='text text_type_digits-medium mr-2'>{totalSum}</span>
                        <CurrencyIcon type='primary'/>
                        <Button htmlType='button' type='primary' size='medium' extraClass='ml-10'>Оформить заказ</Button>
                    </div>
                </div>
        );
    }
}

export default BurgerConstructor