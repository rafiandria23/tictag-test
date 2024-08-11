import type { FC } from 'react';
import { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, HelperText, Button } from 'react-native-paper';

import type { SignInPayload } from '../../types/auth';
import { AuthSecureStoreKey } from '../../constants/auth';
import { SignInValidationSchema } from '../../validations/auth';
import { authApi } from '../../services/auth';

const SignInScreen: FC = () => {
  const router = useRouter();
  const [signIn, signInStatus] = authApi.useSignInMutation();
  const form = useForm<SignInPayload>({
    mode: 'onBlur',
    resolver: zodResolver(SignInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = useCallback<(payload: SignInPayload) => Promise<void>>(
    async (payload) => {
      const { data } = await signIn(payload).unwrap();

      await SecureStore.setItemAsync(
        AuthSecureStoreKey.AccessToken,
        data.access_token,
      );

      router.replace('/');
    },
    [signIn, router],
  );

  return (
    <View>
      <Controller
        key="email"
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              ref={field.ref}
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              autoFocus
              textContentType="emailAddress"
              returnKeyType="next"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              error={!!fieldState.error}
              onSubmitEditing={() => form.setFocus('password')}
            />
            <HelperText type="error">{fieldState.error?.message}</HelperText>
          </>
        )}
      />

      <Controller
        key="password"
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              ref={field.ref}
              label="Password"
              secureTextEntry
              keyboardType="visible-password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              textContentType="password"
              returnKeyType="send"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              error={!!fieldState.error}
            />
            <HelperText type="error">{fieldState.error?.message}</HelperText>
          </>
        )}
      />

      <Button
        loading={signInStatus.isLoading}
        onPress={form.handleSubmit(handleSignIn)}
      >
        Sign in
      </Button>
    </View>
  );
};

export default SignInScreen;
