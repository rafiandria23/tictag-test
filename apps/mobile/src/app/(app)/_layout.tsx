import type { FC } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { SplashScreen, useRouter, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { AuthStorageKey } from '../../constants/auth';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { userSlice } from '../../stores/user';
import { userApi } from '../../services/user';

SplashScreen.preventAutoHideAsync();

const AppLayout: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const [me, meStatus] = userApi.useLazyMeQuery();

  const isCheckingAuth = useMemo(() => {
    return !userState.me || meStatus.isLoading || meStatus.isFetching;
  }, [userState, meStatus]);

  const checkAuth = useCallback(async () => {
    const accessToken = await SecureStore.getItemAsync(
      AuthStorageKey.AccessToken,
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

  if (isCheckingAuth) {
    return null;
  }

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
