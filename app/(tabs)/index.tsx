import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import HomeSVG from '@/assets/icons/house-solid.svg';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getUser = async () => {
        try {
            const response = await fetch('https://anitx.co/q', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Aq: 'SSR /@[username].v1',
                },
                body: JSON.stringify({
                    variables: {
                        username: 'zspfx',
                    },
                }),
            });
            const json = await response.json();
            setData(json.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="subtitle">Playground App</ThemedText>
            </ThemedView>

            {/* Debug json text */}
            {isLoading ? (
                <ThemedText>Loading...</ThemedText>
            ) : (
                <>
                    <ThemedView
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 24, // Adds space between items
                        }}
                    >
                        {/* Show circle profile picture */}
                        <ThemedView style={styles.profileContainer}>
                            <Image
                                source={{ uri: data.targetUser.avatar }}
                                style={styles.profilePicture}
                            />
                        </ThemedView>

                        {/* Username */}
                        <ThemedText type="title">
                            @{data.targetUser.username}
                        </ThemedText>
                    </ThemedView>

                    <ThemedView>
                        <ThemedText
                            type="subtitle"
                            style={{ fontWeight: '400' }}
                        >
                            {data.targetUser.analytics.followers} followers
                        </ThemedText>
                        <ThemedText
                            type="subtitle"
                            style={{ fontWeight: '400' }}
                        >
                            {data.targetUser.analytics.followings} following
                        </ThemedText>
                        <ThemedText
                            type="subtitle"
                            style={{ fontWeight: '400' }}
                        >
                            {data.targetUser.analytics.pageViews} views
                        </ThemedText>
                    </ThemedView>

                    <ThemedText>{JSON.stringify(data)}</ThemedText>
                </>
            )}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
