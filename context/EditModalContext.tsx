import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface EditModalProviderProps {
    children: ReactNode;
}

interface EditModalContextType {
    editModalVisible: boolean;
    openEditModal: () => void;
    closeEditModal: () => void;
}

const EditModalContext = createContext<EditModalContextType>({
    editModalVisible: false,
    openEditModal: () => console.log('Open modal not implemented'),
    closeEditModal: () => {},
});

export const EditModalProvider: React.FC<EditModalProviderProps> = ({ children }) => {
    const [editModalVisible, seteditModalVisible] = useState(false);

    const openEditModal = () => {
        console.log('Open Edit modal called');
        seteditModalVisible(true);
    };
    const closeEditModal = () => {
        console.log('Close Edit modal called');
        seteditModalVisible(false);
    };

    return (
        <EditModalContext.Provider value={{ editModalVisible, openEditModal, closeEditModal }}>
            {children}
        </EditModalContext.Provider>
    );
};

export const useEditModal = () => useContext(EditModalContext);
