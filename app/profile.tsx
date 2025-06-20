import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const toggleTheme = import ('./_layout')
export default function Profile() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Edit app/profile.tsx to edit this screen.</ThemedText>
    </ThemedView>
  );
}