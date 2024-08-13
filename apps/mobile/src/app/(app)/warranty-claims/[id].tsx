import type { FC } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, Divider } from 'react-native-paper';

import type { WarrantyClaim } from '../../../interfaces/product';
import { warrantyClaimApi } from '../../../services/product';

import ProductCard from '../../../components/product/ProductCard';
import WarrantyClaimStatusChip from '../../../components/product/WarrantyClaimStatusChip';

const WarrantyClaimDetailsScreen: FC = () => {
  const { id } = useLocalSearchParams<{ id: WarrantyClaim['_id'] }>();
  const [warrantyClaim, setWarrantyClaim] = useState<WarrantyClaim | null>(
    null,
  );
  const [readById, readByIdStatus] = warrantyClaimApi.useLazyReadByIdQuery();

  const isLoading = useMemo(() => {
    return readByIdStatus.isLoading || readByIdStatus.isFetching;
  }, [readByIdStatus]);

  const handleFetch = useCallback(async () => {
    const { data } = await readById(id).unwrap();

    setWarrantyClaim(data);
  }, [readById, id, setWarrantyClaim]);

  useEffect(() => {
    if (!warrantyClaim) {
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
      {warrantyClaim && (
        <>
          <Text variant="titleMedium">{warrantyClaim.name}</Text>

          <ProductCard product={warrantyClaim.product} />

          <Text variant="bodyMedium">{warrantyClaim.description}</Text>

          <Divider />

          <View style={{ flexDirection: 'row' }}>
            <WarrantyClaimStatusChip status={warrantyClaim.status} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default WarrantyClaimDetailsScreen;
