import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    useColorScheme,
    RefreshControl,
} from 'react-native';

import { ThemedTextEx } from '@/components/ThemedTextEx';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 150;

export default function HomeScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [0, HEADER_HEIGHT],
                        [1, 1.15]
                    ),
                },
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [0, HEADER_HEIGHT],
                        [0, 30]
                    ),
                },
            ],
        };
    });

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [took, setTook] = useState(0);

    const getUser = async () => {
        try {
            const start = performance.now();
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
            const took = performance.now() - start;
            setTook(took);
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

    // if (isLoading) return <ThemedTextEx>Loading...</ThemedTextEx>;

    return (
        <Animated.ScrollView
            ref={scrollRef}
            scrollEventThrottle={16}
            scrollIndicatorInsets={{ bottom }}
            contentContainerStyle={{ paddingBottom: bottom }}
            endFillColor="red"
            fadingEdgeLength={100}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => getUser()}
                    title="Refreshing..."
                    colors={['#fff']}
                    progressBackgroundColor={'#000'}
                />
            }
        >
            <Animated.View
                style={[
                    {
                        height: HEADER_HEIGHT,
                        overflow: 'hidden',
                        width: '100%',
                    },
                    headerAnimatedStyle,
                ]}
            >
                <Image
                    source={{ uri: data?.targetUser?.banner }}
                    style={styles.reactLogo}
                    resizeMode="cover"
                />
            </Animated.View>

            {data?.targetUser && (
                <ThemedView
                    style={{
                        gap: 12,
                        zIndex: 1,
                        backgroundColor: '#000',
                    }}
                >
                    <ThemedView
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: -43,
                        }}
                    >
                        {/* Show circle profile picture */}
                        <ThemedView style={styles.profilePictureOutter}>
                            <Image
                                source={{ uri: data.targetUser.avatar }}
                                style={styles.profilePictureInner}
                            />
                        </ThemedView>

                        <ThemedView style={styles.profileInfo}>
                            {/* Username */}
                            <ThemedTextEx
                                style={{
                                    fontWeight: 700,
                                    fontSize: 32,
                                    letterSpacing: 0.5,
                                    padding: 0,
                                }}
                            >
                                {data.targetUser.displayName}
                            </ThemedTextEx>
                            <ThemedTextEx
                                style={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    letterSpacing: 0.5,
                                }}
                            >
                                @{data.targetUser.username}
                            </ThemedTextEx>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView>
                        <ThemedTextEx>
                            {data.targetUser.analytics.followers} followers
                        </ThemedTextEx>
                        <ThemedTextEx>
                            {data.targetUser.analytics.followings} following
                        </ThemedTextEx>
                        <ThemedTextEx>
                            {data.targetUser.analytics.pageViews} views
                        </ThemedTextEx>
                    </ThemedView>

                    <ThemedView style={styles.titleContainer}>
                        <ThemedTextEx>Playground App</ThemedTextEx>
                    </ThemedView>

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'orange',
                            padding: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => getUser()}
                    >
                        <Text
                            style={{
                                fontWeight: 600,
                                fontSize: 15,
                                textAlign: 'center',
                            }}
                        >
                            RESET
                        </Text>
                    </TouchableOpacity>

                    <ThemedTextEx>
                        API Response Took: {(took - 310).toFixed(0)}ms
                    </ThemedTextEx>

                    <ThemedTextEx>{JSON.stringify(data)}</ThemedTextEx>
                </ThemedView>
            )}
        </Animated.ScrollView>
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
        height: '100%',
        width: '100%',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    profilePictureOutter: {
        width: 100,
        height: 100,
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#000',
        padding: 9,
        zIndex: 1,
    },
    profilePictureInner: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    profileInfo: {
        backgroundColor: '#000',
        marginLeft: -22,
        paddingLeft: 24,
        paddingRight: 26,
        paddingTop: 6,
        borderTopRightRadius: 28,
    },
});
