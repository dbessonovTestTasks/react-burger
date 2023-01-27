import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { useRef } from 'react';
import { useDispatch } from '../hooks/use-dispatch';
import { useDrag, useDrop } from "react-dnd";
import { RemoveIngredientFromBurgerAction } from '../../services/actions/constructor-ingredients';
import { TConstructorIngredient } from '../../utils/common-types/interfaces';
import type { Identifier, XYCoord } from 'dnd-core'

interface IProps {
    ingredient: TConstructorIngredient;
    index: number;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

function BurgerConstructorElement(props: IProps) {
    const dispatch = useDispatch();
    const ingredient = props.ingredient;

    const removeIngredient = (ingredientKey: string) => {
        dispatch(RemoveIngredientFromBurgerAction(ingredientKey))
    };

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<{ index: number }, void, { handlerId: Identifier | null }>({
        accept: 'sortElement',
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() }
        },
        hover(item, monitor) {
            if (!ref.current)
                return;

            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex)
                return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                return;

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
                return;
            props.moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'sortElement',
        item: () => {
            return { id: props.ingredient.key, index: props.index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref));

    return (<>
        {(<div className={`${styles.ingidientBlock} mb-4`}
            style={{ opacity: isDragging ? 0 : 1 }}
            ref={ref} data-handler-id={handlerId}>
            <DragIcon type='primary' />
            <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                handleClose={() => removeIngredient(ingredient.key)}
            />
        </div>)}
    </>
    );
}

export default BurgerConstructorElement