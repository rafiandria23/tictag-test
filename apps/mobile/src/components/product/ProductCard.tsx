import type { FC } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Card, Text } from 'react-native-paper';

import type { Product } from '../../interfaces/product';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleDetails = useCallback(() => {
    router.push(`/products/${product._id}`);
  }, [router, product]);

  return (
    <Card onPress={handleDetails}>
      <Card.Title title={<Text variant="titleSmall">{product.name}</Text>} />
      <Card.Content>
        <Text variant="bodySmall">{product.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
