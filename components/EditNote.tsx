import React from 'react';
import { Modal } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEditModal } from '@/context/EditModalContext';

export const EditNote = ({ content}: { content: React.ReactNode })  => {
    const fileUri = FileSystem.documentDirectory + `notes`;
    const { editModalVisible, openEditModal, closeEditModal } = useEditModal();
    const colorScheme = useColorScheme();

    {/* Modal Edit Note */ }
    return (
        <>
            <Modal
                visible={editModalVisible}
                transparent={true}
                animationType='slide'
            >
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                            <ThemedView
                                style={{ flex: 1, padding: 20 }}>
                                {content}
                            </ThemedView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
        </>
    );
}