import { useEffect, useMemo } from 'react';
import { useDispatch } from '../components/hooks/use-dispatch';
import { useSelector } from '../components/hooks/use-selector';
import { LoaderButton } from '../components/loader-button/loader-button';
import { OrderList } from '../components/order-list/order-list';
import { OrderStat } from '../components/orders-stat/order-stat';
import { wsCommonOrdersActions } from '../services/ws-actions-generation';
import { OrderStatusTypes, WSBASEURL } from '../utils/common-types/constants';
import styles from './feed.module.css';

export function FeedPage() {

    const dispatch = useDispatch();
    const { wsConnected, wsData, error } = useSelector((store) => store.commonOrders);
    const readyOrders = useMemo(() => wsData?.orders.filter(o => o.status === OrderStatusTypes.Done)?.map(o => o.number) ?? [], [wsData?.orders]);
    const inProgressOrders = useMemo(() => wsData?.orders.filter(o => o.status === OrderStatusTypes.Pending)?.map(o => o.number) ?? [], [wsData?.orders]);

    useEffect(() => {
        dispatch(wsCommonOrdersActions.startAction(`${WSBASEURL}/orders/all`));
        return () => {
            dispatch(wsCommonOrdersActions.endAction());
        }
    }, [dispatch]);

    if (!wsConnected || wsData == null) {
        return (<LoaderButton htmlType='button' isDisabled={true} text='' loaderText='Соединение с websocket...'
            errorText={!!error ? 'Не удалось установить соединение' : ''} />)
    }

    return (
        <div className={styles.container}>
            <div>
                <p className={`mb-6 text text_type_main-large ${styles.leftText}`}>Лента заказов</p>
                <OrderList orders={wsData!.orders} url='/feed' showState={false} />
            </div>
            <OrderStat ready={readyOrders} inProgress={inProgressOrders} total={wsData!.total} totalToday={wsData!.totalToday} />
        </div>
    );
}