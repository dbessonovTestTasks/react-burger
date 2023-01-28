import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TConstructorIngredient } from '../../utils/common-types/interfaces';

interface IProps {
    bun: TConstructorIngredient | null;
    type: 'top' | 'bottom';
}

function BunConstructor(props: IProps) {
    const detailedName = props.type === 'top' ? '(верх)' : '(низ)';
    const stubTypeClassName = props.type === 'top' ? 'constructor-element_pos_top' : 'constructor-element_pos_bottom';
    return (!!props.bun ? (
        <ConstructorElement
            type={props.type}
            isLocked={true}
            text={`${props.bun.name} ${detailedName}`}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile}
            extraClass='ml-6'
        />) : <div className={`constructor-element ${stubTypeClassName} ml-6`}><span>Перетащите сюда булочку и ингридиенты</span></div>
    );
}

export default BunConstructor