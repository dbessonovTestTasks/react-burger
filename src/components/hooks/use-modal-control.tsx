import {useState} from 'react';

function useModalControl(){
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return [modalVisible, handleOpenModal, handleCloseModal]  as const;
}

export default useModalControl