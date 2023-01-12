import  styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {useEffect} from 'react';

interface IProps {    
    title?: string;   
    onClose: () => void;
    children?: React.ReactNode;
}

function Modal(props: IProps){
    const modalRoot = document.getElementById("react-modals");

    const {title, onClose, children} = props;
    useEffect( () => {        
        const onKeyDown = (e: KeyboardEvent) => {
            e.key === "Escape" && onClose();
        }

        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("keydown", onKeyDown)
        };
    }, [onClose]);

    return ReactDOM.createPortal(            
            <>
                <div className={`${styles.modal} pl-10 pr-10 pt-10 pb-15`}>
                    <div className={styles.header}>
                        <span className='text text_type_main-large'>{title}</span>
                        <div>
                            <CloseIcon type='primary' onClick={onClose}/>
                        </div>                    
                    </div>
                    <div className={styles.body}>
                        {children}
                    </div>                
                </div>  
                <ModalOverlay onClick={onClose}/>
            </>
    , modalRoot!);
}

export default Modal