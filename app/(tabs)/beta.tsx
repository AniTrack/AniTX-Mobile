import { StyleSheet, Image, Platform, Button, Vibration } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedTextEx } from '@/components/ThemedTextEx';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }
        >
            <Button
                title="Test 123"
                onPress={() => {
                    Vibration.vibrate(50);
                }}
            />

            <ThemedView style={styles.titleContainer}>
                <ThemedTextEx>Beta Portal</ThemedTextEx>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
