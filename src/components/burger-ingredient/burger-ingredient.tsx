import { IBurgerIngredient } from '../../utils/common-types/interfaces';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from '../hooks/use-dispatch';
import { AddPopupIngredientsAction } from '../../services/actions/popuped-ingredient';

interface IProps {
    ingredient: IBurgerIngredient;
    count: number;
}

function BurgerIngredient(props: IProps) {
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: 'burgerIngredient',
        item: { ...props.ingredient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.1 : 1
        })
    });

    return (
        <>
            <div className={`${styles.ingredientCard} mt-6 ml-4 mb-2 mr-2`} style={{ opacity }} 
                 onClick={()=>{dispatch(AddPopupIngredientsAction(props.ingredient))}} ref={dragRef} draggable>
                {props.count > 0
                    ? <Counter count={props.count} size='default' />
                    : null}
                <img className='ml-4 mr-4 mb-1' src={props.ingredient.image} alt={props.ingredient.name} />
                <div className={`${styles.flexCenter} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{props.ingredient.price}</span>
                    <CurrencyIcon type='primary' />
                </div>
                <div className={styles.ingredientName}>
                    <p>{props.ingredient.name}</p>
                </div>
            </div>
        </>
    );
}

export default BurgerIngredient