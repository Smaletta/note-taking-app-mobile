import React from 'react';
import { Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { ThemedTextInput } from './ThemedTextInput';
import { useNoteModal } from '@/context/NoteModalContext';



export const NewNote = () => {

    const { closeModal } = useNoteModal();
    const [titleNewNote, onChangeTitleNewNote] = React.useState('Title');
    const [textNewNote, onChangeTextNewNote] = React.useState('');


    const createNewNote = async () => {
        if (titleNewNote == 'Title') return alert('Please enter a title.');
        if (titleNewNote == '') return alert('Please enter a title.');
        const file = (await FileSystem.getInfoAsync(FileSystem.documentDirectory + `notes/${titleNewNote}`))
        if (file.exists) {
            return alert('Note already exists.');
        }
        try {
            console.log('This code is being reached');
            await FileSystem.writeAsStringAsync(
                FileSystem.documentDirectory + `notes/${titleNewNote}`,
                textNewNote
            );
            closeModal();
            onChangeTitleNewNote('Title');
            onChangeTextNewNote('');
            alert('Note saved!');
        }
        catch (err) { alert('Note could not be saved.'); }
    };

    const closeModalConfirm = () => {
        if (titleNewNote == 'Title' && textNewNote == '') {
            closeModal();
        }
        else {
            Alert.alert('Confirm Close',
                'Are you sure you want to close this?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirm',
                        onPress: () => closeModal(),
                    },
                ],
                { cancelable: false }
            );
        };
    }
    // Test



    // Test
    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <Button title="Close" onPress={closeModalConfirm} />

                <ThemedView style={{ flex: .15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <ThemedTextInput
                        style={{ flex: 1, padding: 20, fontSize: 20, fontWeight: "bold" }}
                        editable
                        onChangeText={onChangeTitleNewNote}
                        value={titleNewNote}
                    />
                    <Button title="Save" onPress={() => createNewNote()} />

                </ThemedView>
                <ThemedView
                    style={{ flex: 1, width: '100%' }}>
                    <ThemedTextInput
                        style={{ flex: 1, padding: 20 }}
                        editable
                        multiline
                        onChangeText={onChangeTextNewNote}
                        value={textNewNote}
                    />
                </ThemedView>
            </KeyboardAvoidingView>
        </>
    )
}


