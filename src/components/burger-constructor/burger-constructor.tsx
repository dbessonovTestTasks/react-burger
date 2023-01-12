import {ConstructorElement, DragIcon, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IBurgerIngredient} from '../../utils/common-types/interfaces';
import  styles from './burger-constructor.module.css';
import BunConstructor from '../bun-constructor/bun-constructor';
import {IngridientTypes} from '../../utils/common-types/constants';
import OrderDetails from '../order-details/order-details';
import useModalControl from '../hooks/use-modal-control';
import { useState } from 'react';

interface IProps {
    ingredients: IBurgerIngredient[];
}

function BurgerConstructor(props: IProps) {
    const [modalVisible, handleOpenModal, handleCloseModal] = useModalControl();
    const [order, /*setOrder*/] = useState({orderNum:"034536"});

    const targetBun = props.ingredients.find(o=>o.type===IngridientTypes.Bun)!;
    const totalSum = props.ingredients.reduce((s, o)=>s+o.price,0);
    return (<>
                <div>
                    <div className={styles.ingidientsContainer}>
                        <BunConstructor bun={targetBun} type='top'/> 
                        <div className={styles.ingidientsSubContainer}>
                            {props.ingredients.filter(o=>o.type!==IngridientTypes.Bun).map(ingredient=>(
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
                        <BunConstructor bun={targetBun} type='bottom'/>                          
                        </div>
                        <div className={styles.totalContainer}>
                            <span className='text text_type_digits-medium mr-2'>{totalSum}</span>
                            <CurrencyIcon type='primary'/>
                            <Button htmlType='button' type='primary' size='medium' extraClass='ml-10' onClick={handleOpenModal}>Оформить заказ</Button>
                        </div>
                </div>
                <div style={{overflow: 'hidden'}}>
                    {modalVisible && <OrderDetails onClose={handleCloseModal} orderNum={order.orderNum}/>}
                </div>
            </>
    );
}

export default BurgerConstructor