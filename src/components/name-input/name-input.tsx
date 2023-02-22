import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef, useState } from "react";

interface TNameInputInterface extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'type' | 'ref'> {
    value: string;
    size?: 'default' | 'small';
    placeholder?: string;
    isIcon?: boolean;
    extraClass?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const NameInput: FC<TNameInputInterface> = ({ extraClass, size, name, value, placeholder, onChange }: TNameInputInterface) => {

    const userNameRef = useRef<HTMLInputElement>(null);
    const [nameIsDisabled, setNameIsDisabled] = useState(true);
    const changeNameDisable = () => {
        setNameIsDisabled(false);
        setTimeout(() => userNameRef.current?.focus(), 0);
    }

    return (<Input
        type={'text'}
        placeholder={placeholder ?? 'Имя'}
        onChange={onChange}
        disabled={nameIsDisabled}
        onIconClick={changeNameDisable}
        onBlur={() => { setNameIsDisabled(true) }}
        value={value}
        name={name}
        size={size ?? 'default'}
        icon='EditIcon'
        extraClass={extraClass}
        ref={userNameRef} />);
}