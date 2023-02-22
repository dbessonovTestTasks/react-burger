import { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IProps {
    onClick: () => void;
}

export const ModalOverlay: FC<IProps> = (props) => {
    return (<div className={styles.overlay} onClick={props.onClick} />);
}