import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BunConstructor } from '../bun-constructor/bun-constructor';
import { ingridientTypes } from '../../utils/common-types/constants';
import { OrderDetails } from '../order-details/order-details';
import useModalControl from '../hooks/use-modal-control';
import { useMemo, useCallback, FC } from 'react';
import { useSelector } from '../hooks/use-selector';
import { useDispatch } from '../hooks/use-dispatch';
import { useDrop } from "react-dnd";
import { AddIngredientToBurgerAction, ChangeBunAction, ChangeIngredientsOrderAction } from '../../services/actions/constructor-ingredients';
import { IExchangeElements, TBurgerIngredient, TConstructorIngredient } from '../../utils/common-types/interfaces';
import { createOrderAction } from '../../services/api-actions-generation';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { Modal } from '../modal/modal';
import { LoaderButton } from '../loader-button/loader-button';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalVisible, handleOpenModal, handleCloseModal] = useModalControl();
    const { request: orderRequest, answer: order, failed: orderFailed, errorMessage: orderErrorMessage } = useSelector(store => store.apiOrder);
    const { bun, notBunIngredients } = useSelector(store => store.constructorIngredients);
    const isLogged = useSelector(store => store.internalUser.isLogged);

    const [, dropTarget] = useDrop({
        accept: "burgerIngredient",
        drop(ingredient: TBurgerIngredient) {
            const newIngredient = { ...ingredient, key: ingredient._id + new Date().getTime() } as TConstructorIngredient;
            const action = ingredient.type === ingridientTypes.Bun ? ChangeBunAction(newIngredient) : AddIngredientToBurgerAction(newIngredient);
            dispatch(action);
        }
    });

    const handleCreateOrder = () => {
        if (!isLogged)
            navigate('/login');
        else {
            dispatch(createOrderAction([...notBunIngredients.map(o => o._id), bun!._id]));
            handleOpenModal();
        }
    }

    const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(ChangeIngredientsOrderAction({ dragIndex: dragIndex, hoverIndex: hoverIndex } as IExchangeElements));
    }, [dispatch])

    const totalSum = useMemo(() => notBunIngredients.reduce((s, o) => s + o.price, 0) + (!!bun ? bun.price * 2 : 0), [bun, notBunIngredients]);
    return (<>
        <div ref={dropTarget}>
            <div className={styles.ingidientsContainer}>
                <BunConstructor bun={bun} type='top' />
                <div className={styles.ingidientsSubContainer}>
                    {notBunIngredients.map((ingredient, index) => (
                        <BurgerConstructorElement ingredient={ingredient} moveIngredient={moveIngredient} index={index} key={ingredient.key} />
                    ))}
                </div>
                <BunConstructor bun={bun} type='bottom' />
            </div>
            <div className={`${styles.totalContainer} ${(!bun && styles.hiddenContainer)}`}>
                <span className='text text_type_digits-medium mr-2'>{totalSum}</span>
                <CurrencyIcon type='primary' />
                <LoaderButton htmlType='button' extraClass='ml-10' onClick={handleCreateOrder}
                    isDisabled={orderRequest} loaderText='Оформление заказа...' text='Оформить заказ'
                    errorText={orderFailed ? orderErrorMessage : ''} />
            </div>
        </div>
        {modalVisible && !!order &&
            (<Modal onClose={handleCloseModal}>
                <OrderDetails orderNum={order.order?.number} />
            </Modal>)}
    </>
    );
}