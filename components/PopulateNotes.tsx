import React, { useEffect } from 'react';
import { FlatList, Button, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemedView } from './ThemedView';
import { ThemedTextInput } from './ThemedTextInput';
import { KeyboardAvoidingView } from 'react-native';
import { Alert } from 'react-native';
import { useEditModal } from '@/context/EditModalContext';
import { EditNote } from './EditNote';


export const PopulateNotes = async () => {
    const [notes, setNotes] = React.useState<string[]>([]);
    const fileUri = FileSystem.documentDirectory + `notes`;
    const [titleNote, onChangeTitleNote] = React.useState('');
    const [textNote, onChangeTextNote] = React.useState('');
    const { editModalVisible, openEditModal, closeEditModal } = useEditModal();
    const [fileName, setFileName] = React.useState('');
    const [refresh, setRefresh] = React.useState(false);
    

    useEffect(() => {
        const fetchDirectoryItems = async () => {
            try {
                const directoryContents = await FileSystem.readDirectoryAsync(fileUri);
                setNotes(directoryContents);
                console.log("Directory Updated.")
                setRefresh(false);
            } catch (error) {
                console.error("Error reading directory", error)
            }
        };

        fetchDirectoryItems();
    }, [refresh]);

    const handleNotePress = async (notes: string) => {
        openEditModal();
        setFileName(notes);
        onChangeTitleNote(notes);
        onChangeTextNote(
            await FileSystem.readAsStringAsync(
                FileSystem.documentDirectory + `notes/${notes}`
            )
        );
    };

    const handleNoteSave = async () => {
        console.log("This line has been reached.")
        if (titleNote != fileName) {
            await FileSystem.moveAsync({
                from: FileSystem.documentDirectory + `notes/${fileName}`,
                to: FileSystem.documentDirectory + `notes/${titleNote}`
            }
            );
        }
        await FileSystem.writeAsStringAsync(
            FileSystem.documentDirectory + `notes/${titleNote}`,
            textNote
        );
        closeEditModal();
        onChangeTitleNote('');
        onChangeTextNote('');
        setFileName('');
        setRefresh(true);
    };

    const deleteNote = async (notes: string) => {
        Alert.alert('Confirm Delete',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: async() => await FileSystem.deleteAsync(
                        FileSystem.documentDirectory + `notes/${notes}`
                    ).then(() =>    setRefresh(true)
        ),
                },
            ]
        );
    };

const renderItem = ({ item }: { item: string }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1 }}>
            <View style={{ flex: 0.8, justifyContent: 'flex-start'}}>
            <Button title={item} onPress={() => handleNotePress(item)} />
            </View>
            <View style={{ flex: 0.2 }}>
            <Button color={'red'} title="Delete" onPress={() => deleteNote(item)} />
            </View>
        </View>
    );
};

const flatListLength = notes.length;
const closeModalConfirm = async () => {
    if (titleNote != fileName || textNote != await FileSystem.readAsStringAsync(
        FileSystem.documentDirectory + `notes/${fileName}`
    )) {
        Alert.alert('Confirm Close',
            'There are unsaved changes. Are you sure you want to close this?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => closeEditModal(),
                },
            ],
            { cancelable: false }
        );
    }
    else {
        closeEditModal();
        setFileName('');
        onChangeTitleNote('');
        onChangeTextNote('');
        setRefresh(true);
    };
}

{/* View/Edit Notes */ }

const EditNoteContents = () => {
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Button title="Close" onPress={closeModalConfirm} />
            <ThemedView
                style={{ flex: 1, padding: 20 }}>
                <ThemedView style={{ flex: .15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <ThemedTextInput
                        style={{ flex: 1, padding: 20, fontSize: 20, fontWeight: "bold" }}
                        editable
                        onChangeText={onChangeTitleNote}
                        value={titleNote}
                    />
                    <Button title="Save" onPress={handleNoteSave} />
                </ThemedView>
                <ThemedView
                    style={{ flex: 1, width: '100%' }}>
                    <ThemedTextInput
                        style={{ flex: 1, padding: 20 }}
                        editable
                        multiline
                        onChangeText={onChangeTextNote}
                        value={textNote}
                    />
                </ThemedView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
};


return (
    <>
        <FlatList
            style={{ flex: 1, width: '100%' }}
            data={notes}
            renderItem={renderItem}
            extraData={fileName}
            initialNumToRender={flatListLength}
        />
        {editModalVisible && <EditNote content={<EditNoteContents />} />}
    </>
);
}