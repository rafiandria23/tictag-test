import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { SplashScreen, useRouter, Stack } from 'expo-router';

import { AuthStorageKey } from '../../constants/auth';
import Storage from '../../utils/storage';

SplashScreen.preventAutoHideAsync();

const AppLayout: FC = () => {
  const router = useRouter();

  const handleCheckAuth = useCallback(async () => {
    const accessToken = await Storage.getItem(AuthStorageKey.AccessToken);

    if (!accessToken) {
      router.replace('/auth/sign-in');
    }

    await SplashScreen.hideAsync();
  }, [router]);

  useEffect(() => {
    handleCheckAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="products/[id]"
        options={{
          headerBackTitleVisible: false,
          title: 'Product Details',
        }}
      />

      <Stack.Screen
        name="warranty-claims/create"
        options={{
          headerBackTitleVisible: false,
          title: 'Claim Warranty',
        }}
      />

      <Stack.Screen
        name="warranty-claims/[id]"
        options={{
          headerBackTitleVisible: false,
          title: 'Warranty Claim Details',
        }}
      />
    </Stack>
  );
};

export default AppLayout;
