import { Text as DefaultText } from "react-native";

import { ThemeProps, useThemeColor } from ".";

export type TextProps = ThemeProps & DefaultText["props"];

export function ThemedText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function ThemedText2(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text2");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
