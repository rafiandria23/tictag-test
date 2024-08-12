import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';

import { ReadAllMetadata } from '../../../interfaces/api';
import type { Product } from '../../../interfaces/product';
import type { ReadAllProductsPayload } from '../../../types/product';
import { SortDirection } from '../../../constants/api';
import { ProductSortProperty } from '../../../constants/product';
import { productApi } from '../../../services/product';

import ProductCard from '../../../components/product/ProductCard';

const ProductsTabScreen: FC = () => {
  const [metadata, setMetadata] = useState<ReadAllMetadata>({
    total: 0,
  });
  const [filters, setFilters] = useState<ReadAllProductsPayload>({
    page: 1,
    page_size: 50,
    sort: SortDirection.Desc,
    sort_by: ProductSortProperty.CreatedAt,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [readAll] = productApi.useLazyReadAllQuery();

  const handleFetch = useCallback<
    (payload: ReadAllProductsPayload) => Promise<void>
  >(
    async (payload) => {
      const {
        metadata: { total },
        data,
      } = await readAll(payload).unwrap();

      setMetadata({
        total,
      });
      setFilters(payload);
      setProducts([...products, ...data]);
    },
    [readAll, setMetadata, setFilters, setProducts, products],
  );

  const handleFetchNext = useCallback(async () => {
    if (metadata.total > products.length) {
      handleFetch({
        ...filters,
        page: (filters.page as number) + 1,
      });
    }
  }, [metadata, products, handleFetch, filters]);

  useEffect(() => {
    if (!metadata.total && !products.length) {
      handleFetch(filters);
    }
  }, [metadata, products, handleFetch, filters]);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      onEndReached={handleFetchNext}
      renderItem={({ item: product }) => <ProductCard product={product} />}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        gap: 16,
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    />
  );
};

export default ProductsTabScreen;
