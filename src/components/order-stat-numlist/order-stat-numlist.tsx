import styles from './order-stat-numlist.module.css';
import { FC } from 'react';

interface IProps {
    numList: number[];
    columnCount: number;
}

export const OrderStatNumlist: FC<IProps> = ({ numList, columnCount }) => {
    return (
        <div className={styles.numListContainer} style={{ gridTemplateColumns: `repeat(${columnCount}, min-content)` }}>
            {numList.map((o, i) => {
                return (<p key={i} className='text text_type_digits-default mb-2'>{o}</p>)
            })}
        </div>
    );
}