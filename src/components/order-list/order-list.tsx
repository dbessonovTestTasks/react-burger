import styles from './order-list.module.css';
import { FC } from 'react';
import { IOrder } from '../../utils/common-types/interfaces';
import { OrderListElement } from '../order-list-element/order-list-element';

interface IProps {
    orders: IOrder[];
    url: string;
    showState: boolean;
}

export const OrderList: FC<IProps> = ({ orders, url, showState }) => {
    let sorted = [...orders].sort((f, n) => f.number < n.number ? -1 : (f.number < n.number ? 1 : 0)).reverse();
    return (
        <div className={styles.container}>
            {sorted.map((o, i) => {
                return (<div className='mb-4'>
                    <OrderListElement {...o} key={i} url={`${url}/${o.number}`} showState={showState} />
                </div>)
            })}
        </div>
    );
}