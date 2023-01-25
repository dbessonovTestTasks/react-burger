import {IBurgerIngredient} from '../../utils/common-types/interfaces';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import  styles from './burger-ingredient.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useModalControl from '../hooks/use-modal-control';

interface IProps {
    ingredient: IBurgerIngredient;
    count: number;
}

function BurgerIngredient(props: IProps) {
    const [modalVisible, handleOpenModal, handleCloseModal] = useModalControl();
    
    return (
        <>
            <div className={`${styles.ingredientCard} mt-6 ml-4 mb-2 mr-2`} onClick={handleOpenModal}>
                {props.count>0
                    ?<Counter count={props.count} size='default'  />
                    :null}
                <img className='ml-4 mr-4 mb-1' src={props.ingredient.image} alt={props.ingredient.name} />
                <div className={`${styles.flexCenter} mt-1 mb-1`}>
                    <span className='text text_type_digits-default mr-2'>{props.ingredient.price}</span>
                    <CurrencyIcon type='primary' />
                </div>
                <div  className={styles.ingredientName}>
                    <p>{props.ingredient.name}</p>
                </div>
            </div>
            <div style={{overflow: 'hidden'}}>
                {modalVisible && <IngredientDetails onClose={handleCloseModal} ingredient={props.ingredient}/>}
            </div>
        </>
    );
}

export default BurgerIngredient