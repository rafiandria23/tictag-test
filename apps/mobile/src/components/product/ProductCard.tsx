import type { FC } from 'react';
import { Card, Text } from 'react-native-paper';

import type { Product } from '../../interfaces/product';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card>
      <Card.Title title={product.name} />
      <Card.Content>
        <Text>{product.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
