import type { FC } from 'react';
import { Stack } from 'expo-router';

const AuthLayout: FC = () => {
  return (
    <Stack>
      <Stack.Screen
        key="sign-up"
        name="sign-up"
        options={{ title: 'Sign up' }}
      />
      <Stack.Screen
        key="sign-in"
        name="sign-in"
        options={{ title: 'Sign in' }}
      />
    </Stack>
  );
};

export default AuthLayout;
