import type { FC } from 'react';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Text, Button } from 'react-native-paper';

import { AuthSecureStoreKey } from '../../../constants/auth';
import { useAppSelector } from '../../../hooks/store';

const MeTabScreen: FC = () => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);

  const handleSignOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AuthSecureStoreKey.AccessToken);

    router.replace('/auth/sign-in');
  }, [router]);

  if (!userState.me) {
    return null;
  }

  return (
    <View>
      <Text>{userState.me.email}</Text>

      <Button onPress={handleSignOut}>Sign out</Button>
    </View>
  );
};

export default MeTabScreen;
