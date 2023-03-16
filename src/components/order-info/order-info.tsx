import styles from './order-info.module.css';
import { FC, useEffect, useMemo } from 'react';
import { orderInfoAction } from '../../services/api-actions-generation';
import { useDispatch } from '../hooks/use-dispatch';
import { useSelector } from '../hooks/use-selector';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { LoaderButton } from '../loader-button/loader-button';
import { OrderInfoIngredient } from '../order-info-ingredient/order-info-ingredient';
import { OrderStatusTypes } from '../../utils/common-types/constants';
import { IBurgerGroupIngredient } from '../../utils/common-types/interfaces';
import { decodeOrderState } from '../../utils/utils';

export const OrderInfo: FC = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const orderInfoStore = useSelector(store => store.orderInfo);
    const orderInfo = !!orderInfoStore.answer?.orders ? orderInfoStore.answer.orders[0] : null;
    useEffect(() => {
        dispatch(orderInfoAction(id!));
    }, [id, dispatch]);

    const ingredientsFromApi = useSelector(store => store.apiIngredients);
    const groupIngridients: IBurgerGroupIngredient[] = [];

    orderInfo?.ingredients.forEach((o) => {
        const included = groupIngridients.find(g => g.id === o);
        if (!!included)
            included.count++;
        else
            groupIngridients.push({ id: o, count: 1 });
    });

    const ingredientsList = useMemo(() => groupIngridients.map(o => {
        return { ...o, ingredientDefinition: ingredientsFromApi.answer?.data.find(ingr => ingr._id === o.id) }
    }) ?? []
        , [orderInfo?.ingredients, ingredientsFromApi.answer?.data]);
    const orderCost = useMemo(() => { return ingredientsList.reduce((s, o) => s + o.ingredientDefinition!.price * o.count, 0) }
        , [ingredientsList]);

    if (orderInfo === null || orderInfo.number.toString() !== id)
        return (<LoaderButton htmlType='button' isDisabled={orderInfoStore.request} text='Получить информацию о заказе'
            loaderText='Получение информации о заказе...'
            errorText={orderInfoStore.errorMessage} />);

    return (<div className={`${styles.container}`}>
        <p className={`text text_type_digits-default ${styles.centerBlock} mb-10`}>#{orderInfo.number}</p>
        <p className={`text text_type_main-medium mb-3`}>{orderInfo.name}</p>
        <p className={`text text_type_main-default ${styles.specColor} mb-15`} >{decodeOrderState(orderInfo.status)}</p>
        <p className={`text text_type_main-medium mb-6`}>Состав:</p>
        <div className={`${styles.ingridientsContainer}`}>
            {ingredientsList.map((o, i) => {
                return (<div className={`mb-4`}>
                    <OrderInfoIngredient {...o} key={i} />
                </div>)
            })}
        </div>
        <div className={`${styles.footer}`}>
            <div>
                <FormattedDate className={`text text_type_main-default text_color_inactive ${styles.leftBlock}`} date={new Date(orderInfo.createdAt)} />
            </div>
            <div className={styles.costBlock}>
                <p className='text text_type_digits-default mr-2'>{orderCost}</p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    </div>
    );
}