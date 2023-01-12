import  styles from './ingredient-details.module.css';
import {IBurgerIngredient} from '../../utils/common-types/interfaces';
import Modal from '../modal/modal';

interface IProps {
    ingredient: IBurgerIngredient;
    onClose: () => void;
}

function IngredientDetails(props: IProps){
    return (<Modal title="Детали ингредиента" onClose={props.onClose}> 
                <div>
                    <img className='pl-5 pr-5 mb-4' src={props.ingredient.image_large} alt={props.ingredient.name} />
                    <p className='text text_type_main-medium mb-8'>{props.ingredient.name}</p>
                    <div className={styles.PFC}>
                        <div>
                            <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
                            <p className='text text_type_digits-default text_color_inactive'>{props.ingredient.calories}</p>
                        </div>
                        <div>
                            <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>{props.ingredient.proteins}</p>
                        </div>
                        <div>
                            <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>{props.ingredient.fat}</p>
                        </div>
                        <div>
                            <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                            <p className='text text_type_digits-default text_color_inactive'>{props.ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </Modal>
    );
}

export default IngredientDetails

