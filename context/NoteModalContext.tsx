import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

interface NoteModalContextType {
    modalVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const NoteModalContext = createContext<NoteModalContextType>({
    modalVisible: false,
    openModal: () => console.log('Open modal not implemented'),
    closeModal: () => {},
});

export const NoteModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        console.log('Open modal called');
        setModalVisible(true);
    };
    const closeModal = () => {
        console.log('Close modal called');
        setModalVisible(false);
    };

    return (
        <NoteModalContext.Provider value={{ modalVisible, openModal, closeModal }}>
            {children}
        </NoteModalContext.Provider>
    );
};

export const useNoteModal = () => useContext(NoteModalContext);
