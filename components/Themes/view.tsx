import { View as DefaultView } from "react-native";
import { ThemeProps, useThemeColor } from ".";

export type ViewProps = ThemeProps & DefaultView["props"];

export function ThemedView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
