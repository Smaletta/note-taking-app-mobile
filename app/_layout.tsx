import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { NoteModalProvider } from '@/context/NoteModalContext';
import { EditModalProvider } from '@/context/EditModalContext';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <NoteModalProvider>
      <EditModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
              barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
              backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'} />
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Tabs screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                  let iconName: 'home' | 'person' = 'home';
                  if (route.name === 'index') iconName = 'home';
                  else if (route.name === 'profile') iconName = 'person';
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}>
                <Tabs.Screen name="index" options={{ title: 'Notes' }} />
                <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
              </Tabs>
            </ThemeProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </EditModalProvider>
    </NoteModalProvider>
  );
}
