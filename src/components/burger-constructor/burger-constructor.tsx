import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import BunConstructor from '../bun-constructor/bun-constructor';
import { IngridientTypes } from '../../utils/common-types/constants';
import OrderDetails from '../order-details/order-details';
import useModalControl from '../hooks/use-modal-control';
import { useState, useMemo } from 'react';
import { useSelector } from '../hooks/use-selector';

function BurgerConstructor() {
    const [modalVisible, handleOpenModal, handleCloseModal] = useModalControl();
    const [order, /*setOrder*/] = useState({ orderNum: "034536" });
    const { bun, notBunIngredients } = useSelector(store => store.constructorIngredients);

    const totalSum = useMemo(() => notBunIngredients.reduce((s, o) => s + o.price, 0) + (!!bun ? bun.price * 2 : 0), [bun, notBunIngredients]);
    return (<>
        <div>
            <div className={styles.ingidientsContainer}>
                <BunConstructor bun={bun} type='top' />
                <div className={styles.ingidientsSubContainer}>
                    {notBunIngredients.map(ingredient => (
                            <div className={`${styles.ingidientBlock} mb-4`} key={ingredient.key}>
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
                <BunConstructor bun={bun} type='bottom' />
            </div>
            <div className={`${styles.totalContainer} ${(!bun&&styles.hiddenContainer)}`}>
                <span className='text text_type_digits-medium mr-2'>{totalSum}</span>
                <CurrencyIcon type='primary' />
                <Button htmlType='button' type='primary' size='medium' extraClass='ml-10' onClick={handleOpenModal}>Оформить заказ</Button>
            </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
            {modalVisible && <OrderDetails onClose={handleCloseModal} orderNum={order.orderNum} />}
        </div>
    </>
    );
}

export default BurgerConstructor