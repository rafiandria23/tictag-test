import _ from 'lodash';
import type { FC } from 'react';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Avatar, Text, Button } from 'react-native-paper';

import { AuthStorageKey } from '../../../constants/auth';
import { useAppSelector } from '../../../hooks/store';

const MeTabScreen: FC = () => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);

  const handleSignOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AuthStorageKey.AccessToken);

    router.replace('/auth/sign-in');
  }, [router]);

  if (!userState.me) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        padding: 32,
        gap: 32,
      }}
    >
      <Avatar.Text
        size={64}
        label={`${userState.me.first_name[0]}${_.get(
          userState,
          'me.last_name[0]',
          '',
        )}`}
      />

      <View
        style={{
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Text variant="titleSmall">
          {`${userState.me.first_name} ${_.get(
            userState,
            'me.last_name',
            '',
          )}`.trim()}
        </Text>

        <Text variant="bodySmall">{userState.me.email}</Text>
      </View>

      <Button mode="contained-tonal" onPress={handleSignOut}>
        Sign out
      </Button>
    </ScrollView>
  );
};

export default MeTabScreen;
