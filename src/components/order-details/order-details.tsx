import styles from './order-details.module.css';
import orderDetailOkImage from '../../images/orderDetailOk.svg'

interface IProps {
    orderNum?: string;
}

function OrderDetails(props: IProps) {
    return (
        <div className={styles.centerText}>
            <p className={`${styles.glow} text text_type_digits-large mb-8`}>{props.orderNum}</p>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <div className='mb-15'>
                <img src={orderDetailOkImage} alt='' />
            </div>
            <p className='text text_type_main-small mb2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-small text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails