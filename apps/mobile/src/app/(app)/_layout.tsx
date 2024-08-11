import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { SplashScreen, useRouter, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { AuthSecureStoreKey } from '../../constants/auth';
import { useAppDispatch } from '../../hooks/store';
import { userSlice } from '../../stores/user';
import { userApi } from '../../services/user';

SplashScreen.preventAutoHideAsync();

const AppLayout: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [me] = userApi.useLazyMeQuery();

  const checkAuth = useCallback(async () => {
    const accessToken = await SecureStore.getItemAsync(
      AuthSecureStoreKey.AccessToken,
    );

    if (!accessToken) {
      router.replace('/auth/sign-in');
    } else {
      const { data } = await me().unwrap();

      dispatch(userSlice.actions.setMe(data));
    }

    await SplashScreen.hideAsync();
  }, [router, dispatch, me]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Stack>
      <Stack.Screen
        key="(tabs)"
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AppLayout;
