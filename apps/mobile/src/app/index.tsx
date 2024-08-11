import type { FC } from 'react';
import { Redirect } from 'expo-router';

const RootIndexScreen: FC = () => {
  return <Redirect href="/products" />;
};

export default RootIndexScreen;
