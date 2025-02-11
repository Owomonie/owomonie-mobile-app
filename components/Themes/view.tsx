import { View as DefaultView } from "react-native";
import { ThemeProps, useThemeColor } from ".";
import { SafeAreaView } from "react-native-safe-area-context";

export type ViewProps = ThemeProps & DefaultView["props"];

export function ThemedSafeAreaView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, style]} {...otherProps}>
      <DefaultView style={{ flex: 1, backgroundColor }} {...otherProps} />
    </SafeAreaView>
  );
}

export function ThemedView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const combinedStyle = [style, { backgroundColor }];

  return <DefaultView style={combinedStyle} {...otherProps} />;
}
