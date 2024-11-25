import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TxtProps extends TextProps {
    lightColor?: string;
    darkColor?: string;
}

type PrimaryFontFamily =
    | 'Fredoka-400'
    | 'Fredoka-500'
    | 'Fredoka-600'
    | 'Fredoka-700';

const fontFamilyForWeight: Record<any, PrimaryFontFamily> = {
    '400': 'Fredoka-400',
    '500': 'Fredoka-500',
    '600': 'Fredoka-600',
    '700': 'Fredoka-700',
};

export const ThemedTextEx: React.FC<TxtProps> = ({
    style,
    lightColor,
    darkColor,
    ...props
}) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const flattenedStyle = StyleSheet.flatten<TextStyle>(style);
    const { fontWeight, ...otherStyles } = flattenedStyle || {};

    return (
        <Text
            {...props}
            style={{
                color,
                ...otherStyles,
                fontFamily: fontFamilyForWeight[fontWeight ?? '500'],
            }}
        />
    );
};
