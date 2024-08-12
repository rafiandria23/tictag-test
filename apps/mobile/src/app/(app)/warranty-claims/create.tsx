import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, HelperText, Button } from 'react-native-paper';

import type {
  Product,
  CreateWarrantyClaimPayload,
} from '../../../interfaces/product';
import { CreateWarrantyClaimValidationSchema } from '../../../validations/product';
import { productApi, warrantyClaimApi } from '../../../services/product';

import ProductCard from '../../../components/product/ProductCard';

const CreateWarrantyClaimScreen: FC = () => {
  const router = useRouter();
  const { product } = useLocalSearchParams<{ product: Product['_id'] }>();
  const [chosenProduct, setChosenProduct] = useState<Product | null>(null);
  const [readProductById, readProductByIdStatus] =
    productApi.useLazyReadByIdQuery();
  const [create, createStatus] = warrantyClaimApi.useCreateMutation();
  const form = useForm<CreateWarrantyClaimPayload>({
    mode: 'onBlur',
    resolver: zodResolver(CreateWarrantyClaimValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      product,
    },
  });

  const handleFetchProduct = useCallback(async () => {
    const { data } = await readProductById(product).unwrap();

    setChosenProduct(data);
  }, [readProductById, product]);

  const handleCreate = useCallback<
    (payload: CreateWarrantyClaimPayload) => Promise<void>
  >(
    async (payload) => {
      await create(payload).unwrap();

      router.replace('/warranty-claims');
    },
    [create, router],
  );

  useEffect(() => {
    if (product && !chosenProduct) {
      handleFetchProduct();
    }
  }, [product, chosenProduct, handleFetchProduct]);

  if (!product) {
    return <Redirect href="/products" />;
  }

  return (
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
        {chosenProduct && <ProductCard product={chosenProduct} />}

        <View
          style={{
            gap: 16,
          }}
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <View>
                <TextInput
                  ref={field.ref}
                  label="Name"
                  mode="outlined"
                  inputMode="text"
                  autoFocus
                  returnKeyType="next"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  error={!!fieldState.error}
                  onSubmitEditing={() => form.setFocus('description')}
                />

                <HelperText type="error">
                  {fieldState.error?.message}
                </HelperText>
              </View>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <View>
                <TextInput
                  ref={field.ref}
                  label="Description"
                  mode="outlined"
                  inputMode="text"
                  multiline
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  error={!!fieldState.error}
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
          loading={createStatus.isLoading}
          onPress={form.handleSubmit(handleCreate)}
        >
          Submit
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateWarrantyClaimScreen;
