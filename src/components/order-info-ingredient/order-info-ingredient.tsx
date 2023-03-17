import styles from './order-info-ingredient.module.css';
import { FC } from 'react';
import { IBurgerGroupIngredient } from '../../utils/common-types/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderInfoIngredient: FC<IBurgerGroupIngredient> = ({ count, ingredientDefinition }) => {
    return (
        <div className={`${styles.container}`}>
            <div className={`mr-4 ${styles.icon}`}>
            <img alt={ingredientDefinition?.name} height={64} src={ingredientDefinition?.image_mobile} />
            </div>            
            <span className={`text text_type_text-default ${styles.name}`}>{ingredientDefinition?.name}</span>
            <div className={styles.costBlock}>
                <span className={`text text_type_digits-default mr-2`}>{`${count} x ${ingredientDefinition?.price}`}</span>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    );
}