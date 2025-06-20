import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import { PopulateNotes } from '@/components/PopulateNotes';
import { CreateNewNote } from '@/components/CreateNewNote';

export default function Index() {
  const fileUri = FileSystem.documentDirectory + `notes`;

  // Create folder for notes if it doesn't exist, else do nothing, exclude web session for testing
  if (FileSystem.documentDirectory !== undefined) {
    FileSystem.makeDirectoryAsync(fileUri);
  }

  return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {CreateNewNote()}
        <ThemedText type='title'>Notes</ThemedText>
        {PopulateNotes()}

      </ThemedView>
  );
}
