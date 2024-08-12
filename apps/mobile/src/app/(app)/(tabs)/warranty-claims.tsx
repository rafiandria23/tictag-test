import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableRipple } from 'react-native-paper';

import type { ReadAllMetadata } from '../../../interfaces/api';
import type { WarrantyClaim } from '../../../interfaces/product';
import type { ReadAllWarrantyClaimsPayload } from '../../../types/product';
import { SortDirection } from '../../../constants/api';
import { WarrantyClaimSortProperty } from '../../../constants/product';
import { warrantyClaimApi } from '../../../services/product';

import WarrantyClaimCard from '../../../components/product/WarrantyClaimCard';

const WarrantyClaimsTabScreen: FC = () => {
  const router = useRouter();
  const [metadata, setMetadata] = useState<ReadAllMetadata>({
    total: 0,
  });
  const [filters, setFilters] = useState<ReadAllWarrantyClaimsPayload>({
    page: 1,
    sort: SortDirection.Desc,
    sort_by: WarrantyClaimSortProperty.UpdatedAt,
  });
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  const [readAll] = warrantyClaimApi.useLazyReadAllQuery();

  const handleFetch = useCallback<
    (payload: ReadAllWarrantyClaimsPayload) => Promise<void>
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
      setWarrantyClaims([...warrantyClaims, ...data]);
    },
    [readAll, setMetadata, setFilters, setWarrantyClaims, warrantyClaims],
  );

  const handleFetchNext = useCallback(async () => {
    if (metadata.total > warrantyClaims.length) {
      handleFetch({
        ...filters,
        page: (filters.page as number) + 1,
      });
    }
  }, [metadata, warrantyClaims, handleFetch, filters]);

  const handleDetails = useCallback<(id: WarrantyClaim['_id']) => () => void>(
    (id) => {
      return () => {
        router.push(`/warranty-claims/${id}`);
      };
    },
    [router],
  );

  useEffect(() => {
    if (!metadata.total && !warrantyClaims.length) {
      handleFetch(filters);
    }
  }, [metadata, warrantyClaims, handleFetch, filters]);

  return (
    <FlatList
      data={warrantyClaims}
      keyExtractor={(warrantyClaim) => warrantyClaim._id}
      onEndReached={handleFetchNext}
      renderItem={({ item: warrantyClaim }) => (
        <TouchableRipple
          onPress={handleDetails(warrantyClaim._id)}
          style={{
            flex: 1,
          }}
        >
          <WarrantyClaimCard warrantyClaim={warrantyClaim} />
        </TouchableRipple>
      )}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    />
  );
};

export default WarrantyClaimsTabScreen;
