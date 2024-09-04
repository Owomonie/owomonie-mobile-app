import { ThemeProps, useThemeColor } from ".";
import { ScrollView as DefaultScrollView } from "react-native";

export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export function ThemedScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
