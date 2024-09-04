import React from "react";
import { TextInput as DefaultTextInput, TextInputProps } from "react-native";
import { useThemeColor } from ".";

// Define custom theme-related properties
interface CustomThemeProps {
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
}

// Combine custom theme props with TextInputProps
export type ThemedInputProps = CustomThemeProps & TextInputProps;

export function ThemedInput(props: ThemedInputProps) {
  // Destructure props
  const {
    style,
    lightBackgroundColor,
    darkBackgroundColor,
    lightTextColor,
    darkTextColor,
    ...otherProps
  } = props;

  // Get theme colors
  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    "inputBackground"
  );

  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    "inputText"
  );

  // Return the themed TextInput component
  return (
    <DefaultTextInput
      style={[{ backgroundColor, color: textColor }, style]}
      {...otherProps}
    />
  );
}
