import type { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

import { store } from '../stores';

const RootLayout: FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="tabs"
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen name="auth" /> */}
        </Stack>
      </PaperProvider>
    </ReduxProvider>
  );
};

export default RootLayout;
