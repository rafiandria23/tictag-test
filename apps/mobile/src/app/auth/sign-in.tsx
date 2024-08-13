import type { FC } from 'react';
import { useCallback } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text, TextInput, HelperText, Button } from 'react-native-paper';

import type { SignInPayload } from '../../types/auth';
import { AuthStorageKey } from '../../constants/auth';
import { SignInValidationSchema } from '../../validations/auth';
import { authApi } from '../../services/auth';
import Storage from '../../utils/storage';

const SignInScreen: FC = () => {
  const router = useRouter();
  const [signIn, signInStatus] = authApi.useSignInMutation();
  const form = useForm<SignInPayload>({
    mode: 'onSubmit',
    resolver: zodResolver(SignInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = useCallback<(payload: SignInPayload) => Promise<void>>(
    async (payload) => {
      const { data } = await signIn(payload).unwrap();

      await Storage.setItem(AuthStorageKey.AccessToken, data.access_token);

      router.replace('/');
    },
    [signIn, router],
  );

  const handleSignUp = useCallback(() => {
    router.push('/auth/sign-up');
  }, [router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            padding: 32,
            gap: 32,
          }}
        >
          <Text variant="titleLarge">Sign in</Text>

          <View
            style={{
              gap: 16,
            }}
          >
            <Controller
              control={form.control}
              name="email"
              disabled={signInStatus.isLoading}
              render={({ field, fieldState }) => (
                <View>
                  <TextInput
                    ref={field.ref}
                    disabled={field.disabled}
                    label="Email"
                    mode="outlined"
                    inputMode="email"
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

                  <HelperText type="error">
                    {fieldState.error?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              disabled={signInStatus.isLoading}
              render={({ field, fieldState }) => (
                <View>
                  <TextInput
                    ref={field.ref}
                    disabled={field.disabled}
                    label="Password"
                    mode="outlined"
                    inputMode="text"
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
                    onSubmitEditing={form.handleSubmit(handleSignIn)}
                  />

                  <HelperText type="error">
                    {fieldState.error?.message}
                  </HelperText>
                </View>
              )}
            />
          </View>

          <View
            style={{
              gap: 16,
            }}
          >
            <Button
              mode="contained"
              disabled={signInStatus.isLoading}
              loading={signInStatus.isLoading}
              onPress={form.handleSubmit(handleSignIn)}
            >
              Sign in
            </Button>

            <Button compact onPress={handleSignUp}>
              Create an account
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
