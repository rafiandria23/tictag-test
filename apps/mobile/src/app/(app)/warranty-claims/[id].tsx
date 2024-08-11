import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import { Text } from 'react-native-paper';

import type { WarrantyClaim } from '../../../interfaces/product';
import { warrantyClaimApi } from '../../../services/product';

const WarrantyClaimDetailsScreen: FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: WarrantyClaim['_id'] }>();
  const [warrantyClaim, setWarrantyClaim] = useState<WarrantyClaim | null>(
    null,
  );
  const [readById, readByIdStatus] = warrantyClaimApi.useLazyReadByIdQuery();

  const handleFetch = useCallback(async () => {
    const { data } = await readById(id).unwrap();

    setWarrantyClaim(data);
  }, [readById, id, setWarrantyClaim]);

  useEffect(() => {
    if (id && !warrantyClaim) {
      handleFetch();
    }
  }, [id, warrantyClaim, handleFetch]);

  if (!id) {
    return <Redirect href="/warranty-claims" />;
  }

  return (
    <View>
      <Text>{warrantyClaim?.name}</Text>
      <Text>{warrantyClaim?.description}</Text>
      <Text>{warrantyClaim?.status}</Text>
    </View>
  );
};

export default WarrantyClaimDetailsScreen;
