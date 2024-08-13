import type { FC } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, Divider, Button } from 'react-native-paper';

import type { Product } from '../../../interfaces/product';
import { productApi } from '../../../services/product';

const ProductDetailsScreen: FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: Product['_id'] }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [readById, readByIdStatus] = productApi.useLazyReadByIdQuery();

  const isLoading = useMemo(() => {
    return readByIdStatus.isLoading || readByIdStatus.isFetching;
  }, [readByIdStatus]);

  const handleFetch = useCallback(async () => {
    const { data } = await readById(id).unwrap();

    setProduct(data);
  }, [readById, id, setProduct]);

  const handleWarrantyClaim = useCallback(() => {
    router.push({
      pathname: '/warranty-claims/create',
      params: {
        product: product?._id,
      },
    });
  }, [router, product]);

  useEffect(() => {
    if (!product) {
      handleFetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 32,
        gap: 32,
      }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleFetch} />
      }
    >
      {product && (
        <>
          <Text variant="titleMedium">{product.name}</Text>

          <Text variant="bodyMedium">{product.description}</Text>

          <Divider />

          <Button mode="contained-tonal" onPress={handleWarrantyClaim}>
            Claim warranty
          </Button>
        </>
      )}
    </ScrollView>
  );
};

export default ProductDetailsScreen;
