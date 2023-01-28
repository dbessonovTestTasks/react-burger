import { useState } from 'react';

function useModalControl(onOpen?: () => void, onClose?: () => void) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
        if (!!onOpen)
            onOpen();
    }

    const handleCloseModal = () => {
        setModalVisible(false);
        if (!!onClose)
            onClose();
    }

    return [modalVisible, handleOpenModal, handleCloseModal] as const;
}

export default useModalControl