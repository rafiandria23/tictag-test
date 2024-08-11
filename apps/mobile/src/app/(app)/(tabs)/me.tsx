import type { FC } from 'react';
import { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-paper';

import { AuthSecureStoreKey } from '../../../constants/auth';
import { userApi } from '../../../services/user';

const MeTabScreen: FC = () => {
  const router = useRouter();
  const { isLoading, isFetching, data } = userApi.useMeQuery();

  const handleSignOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AuthSecureStoreKey.AccessToken);

    router.replace('/auth/sign-in');
  }, [router]);

  return (
    <View>
      <Text>{data?.data.email}</Text>

      <Button onPress={handleSignOut}>Sign out</Button>
    </View>
  );
};

export default MeTabScreen;
