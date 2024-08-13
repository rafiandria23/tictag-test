import type { FC } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

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
  const [readAllPayload, setReadAllPayload] = useState<ReadAllProductsPayload>({
    page: 1,
    sort: SortDirection.Desc,
    sort_by: ProductSortProperty.CreatedAt,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [readAll, readAllStatus] = productApi.useLazyReadAllQuery();

  const isLoading = useMemo(() => {
    return readAllStatus.isLoading || readAllStatus.isFetching;
  }, [readAllStatus]);

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
      setReadAllPayload(payload);
      setProducts([...products, ...data]);
    },
    [readAll, setMetadata, setReadAllPayload, setProducts, products],
  );

  const handleFetchNext = useCallback(async () => {
    if (metadata.total > products.length) {
      await handleFetch({
        ...readAllPayload,
        page: (readAllPayload.page as number) + 1,
      });
    }
  }, [metadata, products, handleFetch, readAllPayload]);

  const handleRefresh = useCallback(() => {
    setReadAllPayload({
      ...readAllPayload,
      page: 0,
    });
    setProducts([]);
  }, [setReadAllPayload, readAllPayload, setProducts]);

  useEffect(() => {
    if (!products.length) {
      handleFetch(readAllPayload);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      onEndReached={handleFetchNext}
      refreshing={isLoading}
      onRefresh={handleRefresh}
      renderItem={({ item: product }) => <ProductCard product={product} />}
      ListFooterComponent={
        (readAllPayload.page as number) > 1 && isLoading ? (
          <ActivityIndicator />
        ) : null
      }
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    />
  );
};

export default ProductsTabScreen;
