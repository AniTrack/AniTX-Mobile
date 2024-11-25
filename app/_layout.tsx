import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        'Fredoka-400': require('../assets/fonts/Fredoka-Regular.ttf'),
        'Fredoka-500': require('../assets/fonts/Fredoka-Medium.ttf'),
        'Fredoka-600': require('../assets/fonts/Fredoka-SemiBold.ttf'),
        'Fredoka-700': require('../assets/fonts/Fredoka-Bold.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                <Stack.Screen name="+not-found" />
            </Stack>

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
