import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent } from 'react';
import styles from './loader-button.module.css';

interface Props extends React.PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'size'>> {
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    extraClass?: string;
    htmlType: 'button' | 'submit' | 'reset';
    isDisabled: boolean;
    loaderText: string;
    text: string;
    errorText?: string;
}

function LoaderButton({ onClick, extraClass, htmlType, isDisabled, loaderText, text, errorText }: Props) {
    return (
        <>
            {!!errorText && (
                <div className={`mb-2 ${styles.errorText}`}>
                    <p className={`text text_type_main-default`}> {errorText}</p>
                </div>
            )}
            <Button htmlType={htmlType} type='primary' size='medium' extraClass={extraClass} onClick={onClick} disabled={isDisabled}>
                {isDisabled
                    ? (
                        <div>
                            <div className={styles.ldsHourglass}></div>
                            <span>{loaderText}</span>
                        </div>)
                    : text}
            </Button>
        </>
    );
}

export default LoaderButton;