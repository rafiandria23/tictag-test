import _ from 'lodash';
import type { FC } from 'react';
import { useEffect, useMemo, useCallback } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Avatar, Text, Button } from 'react-native-paper';

import { AuthStorageKey } from '../../../constants/auth';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { userSlice } from '../../../stores/user';
import { userApi } from '../../../services/user';
import Storage from '../../../utils/storage';

const MeTabScreen: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const [me, meStatus] = userApi.useLazyMeQuery();

  const isLoading = useMemo(() => {
    return meStatus.isLoading || meStatus.isFetching;
  }, [meStatus]);

  const handleFetch = useCallback(async () => {
    const { data } = await me().unwrap();

    dispatch(userSlice.actions.setMe(data));
  }, [dispatch, me]);

  const handleSignOut = useCallback(async () => {
    await Storage.deleteItem(AuthStorageKey.AccessToken);

    router.replace('/auth/sign-in');
  }, [router]);

  useEffect(() => {
    if (!userState.me) {
      handleFetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleFetch} />
      }
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        padding: 32,
        gap: 32,
      }}
    >
      {userState.me && (
        <>
          <Avatar.Text
            size={64}
            label={`${userState.me.first_name[0]}${_.get(
              userState,
              'me.last_name[0]',
              '',
            )}`.toUpperCase()}
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
        </>
      )}
    </ScrollView>
  );
};

export default MeTabScreen;
