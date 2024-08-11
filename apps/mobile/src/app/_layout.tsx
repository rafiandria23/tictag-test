import type { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';

import { store } from '../stores';

const RootLayout: FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default RootLayout;
