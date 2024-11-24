import { Tabs } from 'expo-router';
import React from 'react';
import { Easing, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import CubeSVG from '@/assets/icons/cube-solid.svg';
import HomeSVG from '@/assets/icons/house-solid.svg';
import BetaSVG from '@/assets/icons/seedling-solid.svg';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {
                        height: 50, // Adjust this value to change tab bar height
                        paddingBottom: 10, // Optional: add padding at the bottom
                        paddingTop: 6, // Optional: add padding at the top
                        backgroundColor: 'black',
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="topic"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <CubeSVG width={30} height={30} fill={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <HomeSVG width={30} height={30} fill={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="beta"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <BetaSVG width={30} height={30} fill={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
