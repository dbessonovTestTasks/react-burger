import  styles from './modal-overlay.module.css';

interface IProps {   
    onClick: () => void;    
}

function ModalOverlay(props: IProps){
    return (<div className={styles.overlay} onClick={props.onClick}/>);
}

export default ModalOverlay