import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {IBurgerIngredient} from '../../utils/common-types/interfaces';

interface IProps {
    bun?: IBurgerIngredient;
    type: 'top' | 'bottom';
}

function BunConstructor(props :IProps) {
    const detailedName = props.type==='top' ? '(верх)' : '(низ)';
    return (!!props.bun?(
        <ConstructorElement
        type={props.type}
        isLocked={true}
        text={`${props.bun.name} ${detailedName}`}
        price={props.bun.price}
        thumbnail={props.bun.image_mobile}
        extraClass='ml-6'
        />):null
    );  
}

export default BunConstructor