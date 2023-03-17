import { useEffect } from 'react';
import { useDispatch } from '../components/hooks/use-dispatch';
import { useSelector } from '../components/hooks/use-selector';
import { LoaderButton } from '../components/loader-button/loader-button';
import { OrderList } from '../components/order-list/order-list';
import { wsUserOrdersActions } from '../services/ws-actions-generation';
import { WSBASEURL } from '../utils/common-types/constants';
import { getCookie } from '../utils/cookies';


export function UserOrdersPage() {
    const dispatch = useDispatch();
    const { wsConnected, wsData, error } = useSelector((store) => store.userOrders);

    useEffect(() => {
        dispatch(wsUserOrdersActions.startAction(`${WSBASEURL}/orders?token=${getCookie('accessToken')}`));
        return () => {
            dispatch(wsUserOrdersActions.endAction());
        }
    },
        [dispatch]
    );

    if (!wsConnected || wsData == null) {
        return (<LoaderButton htmlType='button' isDisabled={true} text='' loaderText='Соединение с websocket...'
            errorText={!!error ? 'Не удалось установить соединение' : ''} />)
    }

    return (
        <div>
            <OrderList orders={wsData!.orders} url='/profile/orders' showState={true} />
        </div>);
}