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

import type { SignUpPayload } from '../../interfaces/auth';
import { AuthStorageKey } from '../../constants/auth';
import { SignUpValidationSchema } from '../../validations/auth';
import { authApi } from '../../services/auth';
import Storage from '../../utils/storage';

const SignUpScreen: FC = () => {
  const router = useRouter();
  const [signUp, signUpStatus] = authApi.useSignUpMutation();
  const form = useForm<SignUpPayload>({
    mode: 'onSubmit',
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const handleSignUp = useCallback<(payload: SignUpPayload) => Promise<void>>(
    async (payload) => {
      const { data } = await signUp(payload).unwrap();

      await Storage.setItem(AuthStorageKey.AccessToken, data.access_token);

      router.replace('/');
    },
    [signUp, router],
  );

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
          <Text variant="titleLarge">Create an account</Text>

          <View
            style={{
              gap: 16,
            }}
          >
            <Controller
              control={form.control}
              name="first_name"
              disabled={signUpStatus.isLoading}
              render={({ field, fieldState }) => (
                <View>
                  <TextInput
                    ref={field.ref}
                    disabled={field.disabled}
                    label="First name"
                    mode="outlined"
                    inputMode="text"
                    autoComplete="name-given"
                    autoFocus
                    textContentType="givenName"
                    returnKeyType="next"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    error={!!fieldState.error}
                    onSubmitEditing={() => form.setFocus('last_name')}
                  />

                  <HelperText type="error">
                    {fieldState.error?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={form.control}
              name="last_name"
              disabled={signUpStatus.isLoading}
              render={({ field, fieldState }) => (
                <View>
                  <TextInput
                    ref={field.ref}
                    disabled={field.disabled}
                    label="Last Name"
                    mode="outlined"
                    inputMode="text"
                    autoComplete="name-family"
                    textContentType="familyName"
                    returnKeyType="next"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    error={!!fieldState.error}
                    onSubmitEditing={() => form.setFocus('email')}
                  />

                  <HelperText type="error">
                    {fieldState.error?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              disabled={signUpStatus.isLoading}
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
              disabled={signUpStatus.isLoading}
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
                    onSubmitEditing={form.handleSubmit(handleSignUp)}
                  />

                  <HelperText type="error">
                    {fieldState.error?.message}
                  </HelperText>
                </View>
              )}
            />
          </View>

          <Button
            mode="contained"
            disabled={signUpStatus.isLoading}
            loading={signUpStatus.isLoading}
            onPress={form.handleSubmit(handleSignUp)}
          >
            Sign up
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
