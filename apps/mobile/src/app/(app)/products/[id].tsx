import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import { Text, Button } from 'react-native-paper';

import type { Product } from '../../../interfaces/product';
import { productApi } from '../../../services/product';

const ProductDetailsScreen: FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: Product['_id'] }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [readById, readByIdStatus] = productApi.useLazyReadByIdQuery();

  const handleFetch = useCallback(async () => {
    const { data } = await readById(id).unwrap();

    setProduct(data);
  }, [readById, id, setProduct]);

  useEffect(() => {
    if (id && !product) {
      handleFetch();
    }
  }, [id, product, handleFetch]);

  const handleWarrantyClaim = useCallback(() => {
    router.push({
      pathname: '/warranty-claims/create',
      params: {
        product: product?._id,
      },
    });
  }, [router, product]);

  if (!id) {
    return <Redirect href="/products" />;
  }

  return (
    <View>
      <Text>{product?.name}</Text>
      <Text>{product?.description}</Text>
      <Button mode="contained-tonal" onPress={handleWarrantyClaim}>
        Claim warranty
      </Button>
    </View>
  );
};

export default ProductDetailsScreen;
