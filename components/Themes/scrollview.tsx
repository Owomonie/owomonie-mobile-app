import { ThemeProps, useThemeColor } from ".";
import { ScrollView as DefaultScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedScrollViewProps = ThemeProps & DefaultScrollView["props"];

export function ThemedScrollView(props: ThemedScrollViewProps) {
  const { style, lightColor, darkColor, contentContainerStyle, ...otherProps } =
    props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <DefaultScrollView
        contentContainerStyle={[{ backgroundColor }, contentContainerStyle]}
        {...otherProps}
      />
    </SafeAreaView>
  );
}
