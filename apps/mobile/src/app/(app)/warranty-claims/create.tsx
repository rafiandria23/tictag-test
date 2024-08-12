import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
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
    <View>
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              ref={field.ref}
              label="Name"
              autoFocus
              returnKeyType="next"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              error={!!fieldState.error}
              onSubmitEditing={() => form.setFocus('description')}
            />
            <HelperText type="error">{fieldState.error?.message}</HelperText>
          </>
        )}
      />

      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <>
            <TextInput
              ref={field.ref}
              label="Description"
              multiline
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
        loading={createStatus.isLoading}
        onPress={form.handleSubmit(handleCreate)}
      >
        Submit
      </Button>
    </View>
  );
};

export default CreateWarrantyClaimScreen;
