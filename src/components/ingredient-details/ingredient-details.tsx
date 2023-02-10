import styles from './ingredient-details.module.css';
import { useSelector } from '../hooks/use-selector';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
    const { id } = useParams();
    const ingredient = useSelector(store => store.apiIngredients.answer?.data.find(o => o._id === id));

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <img className='pl-5 pr-5 mb-4' src={ingredient?.image_large} alt={ingredient?.name} />
                <p className='text text_type_main-medium mb-8'>{ingredient?.name}</p>
                <div className={styles.PFC}>
                    <div>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.calories}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.proteins}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.fat}</p>
                    </div>
                    <div>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails

