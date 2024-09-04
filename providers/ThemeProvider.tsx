import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  resetTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load theme preference from AsyncStorage on initial render
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme !== null) {
          setIsDarkMode(JSON.parse(storedTheme));
        } else {
          setIsDarkMode(colorScheme === "dark");
        }
      } catch (error) {
        console.error(
          "Failed to load theme preference from AsyncStorage",
          error
        );
      }
    };

    loadThemePreference();
  }, [colorScheme]);

  // Toggle dark mode and update AsyncStorage
  const toggleDarkMode = async () => {
    try {
      const newTheme = !isDarkMode;
      await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
      setIsDarkMode(newTheme);
    } catch (error) {
      console.error("Failed to save theme preference to AsyncStorage", error);
    }
  };

  const resetTheme = () => {
    setIsDarkMode(colorScheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
