import styles from './order-list-element.module.css';
import { FC, useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../hooks/use-selector';
import { MAX_ICONS_COUNT_IN_ORDER_LIST_ELEMENT } from '../../utils/common-types/constants';
import { IOrder } from '../../utils/common-types/interfaces';
import { Link, useLocation } from 'react-router-dom';
import { decodeOrderState } from '../../utils/utils';

interface IProps extends IOrder {
    url: string;
    showState: boolean;
}

export const OrderListElement: FC<IProps> = ({ ingredients, status, number, createdAt, name, url, showState }) => {
    const maxIcons = MAX_ICONS_COUNT_IN_ORDER_LIST_ELEMENT;

    const ingredientsFromApi = useSelector(store => store.apiIngredients);
    const ingredientsList = useMemo(() => ingredients?.map(o => ingredientsFromApi.answer?.data.find(ingr => ingr._id === o)!) ?? []
        , [ingredients, ingredientsFromApi.answer?.data]);
    const ingredientsInfo = useMemo(() => { return { iconList: ingredientsList.slice(0, maxIcons), cost: ingredientsList.reduce((s, o) => s + o.price, 0) } }
        , [ingredientsList]);

    const additinalNumberOverlayCount = ingredientsList.length - maxIcons;
    const location = useLocation();

    return (
        <Link className={styles.link} state={{ background: location }}
            to={{ pathname: url }}>
            <div className={`${styles.container}`}>
                <div className={`${styles.containerContent}`}>
                    <div className={`mt-6 mb-6 ${styles.cardHeader}`}>
                        <p className={`text text_type_digits-default ${styles.leftBlock}`}>#{number}</p>
                        <FormattedDate className={`text text_type_main-default text_color_inactive ${styles.rightBlock}`} date={new Date(createdAt)} />
                    </div>
                    <p className={`${showState ? 'mb-2' : 'mb-6'} text text_type_main-medium ${styles.leftText}`}>{name}</p>
                    {showState
                        ? <p className={`mb-6 text text_type_main-default ${styles.specColor}`} >{decodeOrderState(status)}</p>
                        : null}
                    <div className={`mb-6 ${styles.iconCost}`}>
                        <div className={styles.iconBlock}>
                            {ingredientsInfo.iconList.map((o, i) => {
                                return (
                                    <div key={i} style={{ zIndex: maxIcons - i }}
                                        className={styles.icon}>
                                        <img src={o.image_mobile} alt={o.name} height={64} />
                                        {((maxIcons - 1) === i && additinalNumberOverlayCount > 0) ? (
                                            <div className={styles.textOverlay}>
                                                <p className='text_type_main-default'>+{additinalNumberOverlayCount}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.costBlock}>
                            <p className='text text_type_digits-default mr-2'>{ingredientsInfo.cost}</p>
                            <CurrencyIcon type='primary' />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}