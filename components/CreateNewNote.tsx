import React from 'react';
import { Modal, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { NewNote } from './NewNote';
import { useNoteModal } from '@/context/NoteModalContext';

export const CreateNewNote = () => {
    const fileUri = FileSystem.documentDirectory + `notes`;
    const { modalVisible, openModal, closeModal } = useNoteModal();
    const colorScheme = useColorScheme();

    {/* Modal New Note */ }
    return (
        <>
            <View style={{ flex: .15, justifyContent: "center" }}>
                <Button title="Add Note" onPress={openModal} />
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='slide'
            >
                <SafeAreaProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                            <ThemedView
                                style={{ flex: 1, padding: 20 }}>
                                <NewNote />
                            </ThemedView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </SafeAreaProvider>
            </Modal>
        </>
    );
}