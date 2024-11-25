import { StyleSheet, Image, Platform, Button, Vibration } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedTextEx } from '@/components/ThemedTextEx';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
                <ThemedTextEx>Explore</ThemedTextEx>
            </ThemedView>
            <ThemedTextEx>
                This app includes example code to help you get started.
            </ThemedTextEx>
            <Collapsible title="File-based routing">
                <ThemedTextEx>
                    This app has two screens:{' '}
                    <ThemedTextEx>app/(tabs)/index.tsx</ThemedTextEx> and{' '}
                    <ThemedTextEx>app/(tabs)/explore.tsx</ThemedTextEx>
                </ThemedTextEx>
                <ThemedTextEx>
                    The layout file in{' '}
                    <ThemedTextEx>app/(tabs)/_layout.tsx</ThemedTextEx> sets up
                    the tab navigator.
                </ThemedTextEx>
                <ExternalLink href="https://docs.expo.dev/router/introduction">
                    <ThemedTextEx>Learn more</ThemedTextEx>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Android, iOS, and web support">
                <ThemedTextEx>
                    You can open this project on Android, iOS, and the web. To
                    open the web version, press <ThemedTextEx>w</ThemedTextEx>{' '}
                    in the terminal running this project.
                </ThemedTextEx>
            </Collapsible>
            <Collapsible title="Images">
                <ThemedTextEx>
                    For static images, you can use the{' '}
                    <ThemedTextEx>@2x</ThemedTextEx> and{' '}
                    <ThemedTextEx>@3x</ThemedTextEx> suffixes to provide files
                    for different screen densities
                </ThemedTextEx>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={{ alignSelf: 'center' }}
                />
                <ExternalLink href="https://reactnative.dev/docs/images">
                    <ThemedTextEx>Learn more</ThemedTextEx>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Custom fonts">
                <ThemedTextEx>
                    Open <ThemedTextEx>app/_layout.tsx</ThemedTextEx> to see how
                    to load{' '}
                    <ThemedTextEx
                        style={{
                            fontFamily: 'Fredoka',
                            fontSize: 30,
                        }}
                    >
                        custom fonts such as this one.
                    </ThemedTextEx>
                </ThemedTextEx>
                <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
                    <ThemedTextEx>Learn more</ThemedTextEx>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Light and dark mode components">
                <ThemedTextEx>
                    This template has light and dark mode support. The{' '}
                    <ThemedTextEx>useColorScheme()</ThemedTextEx> hook lets you
                    inspect what the user's current color scheme is, and so you
                    can adjust UI colors accordingly.
                </ThemedTextEx>
                <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
                    <ThemedTextEx>Learn more</ThemedTextEx>
                </ExternalLink>
            </Collapsible>
            <Collapsible title="Animations">
                <ThemedTextEx>
                    This template includes an example of an animated component.
                    The <ThemedTextEx>components/HelloWave.tsx</ThemedTextEx>{' '}
                    component uses the powerful{' '}
                    <ThemedTextEx>react-native-reanimated</ThemedTextEx> library
                    to create a waving hand animation.
                </ThemedTextEx>
                {Platform.select({
                    ios: (
                        <ThemedTextEx>
                            The{' '}
                            <ThemedTextEx>
                                components/ParallaxScrollView.tsx
                            </ThemedTextEx>{' '}
                            component provides a parallax effect for the header
                            image.
                        </ThemedTextEx>
                    ),
                })}
            </Collapsible>
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
