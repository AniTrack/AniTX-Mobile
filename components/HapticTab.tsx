import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
    return (
        <PlatformPressable
            {...props}
            onPressIn={(ev) => {
                // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

                Vibration.vibrate(30);
                props.onPressIn?.(ev);
            }}
        />
    );
}
