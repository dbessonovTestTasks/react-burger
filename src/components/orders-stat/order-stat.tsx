import styles from './order-stat.module.css';
import { FC } from 'react';
import { OrderStatNumlist } from '../order-stat-numlist/order-stat-numlist';

interface IProps {
    ready: number[];
    inProgress: number[];
    total: number;
    totalToday: number;
}

export const OrderStat: FC<IProps> = ({ ready, inProgress, total, totalToday }) => {
    return (
        <div className={styles.container}>
            <div className={styles.numlists}>
                <div className={`mr-9`}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <div className={styles.blueColour}>
                        <OrderStatNumlist columnCount={2} numList={ready.slice(0, 12)} />
                    </div>
                </div>
                <div>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <OrderStatNumlist columnCount={2} numList={inProgress.slice(0, 12)} />
                </div>
            </div >

            <p className='text text_type_main-medium'>Выполнено за все время</p>
            <p className={`text text_type_digits-large mb-15 ${styles.glow}`}>{total}</p>
            <p className='text text_type_main-medium'>Выполнено за сегодня</p>
            <p className={`text text_type_digits-large mb-15 ${styles.glow}`}>{totalToday}</p>
        </div >
    );
}