import type { FC } from 'react';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Slot } from 'expo-router';
import {
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import merge from 'deepmerge';

import { store } from '../stores';

const RootLayout: FC = () => {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(() => {
    const CustomLightTheme = {
      ...MD3LightTheme,
      colors: theme.light,
    };
    const CustomDarkTheme = {
      ...MD3DarkTheme,
      colors: theme.dark,
    };

    const { LightTheme, DarkTheme } = adaptNavigationTheme({
      reactNavigationLight: NavigationLightTheme,
      reactNavigationDark: NavigationDarkTheme,
    });

    const CombinedLightTheme = merge(LightTheme, CustomLightTheme);
    const CombinedDarkTheme = merge(DarkTheme, CustomDarkTheme);

    if (colorScheme === 'dark') {
      return CombinedDarkTheme;
    }

    return CombinedLightTheme;
  }, [theme, colorScheme]);

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationThemeProvider value={paperTheme}>
          <Slot />
        </NavigationThemeProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default RootLayout;
