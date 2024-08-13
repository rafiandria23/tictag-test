import type { FC } from 'react';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import type { ReadAllMetadata } from '../../../interfaces/api';
import type { WarrantyClaim } from '../../../interfaces/product';
import type { ReadAllWarrantyClaimsPayload } from '../../../types/product';
import { SortDirection } from '../../../constants/api';
import { WarrantyClaimSortProperty } from '../../../constants/product';
import { warrantyClaimApi } from '../../../services/product';

import WarrantyClaimCard from '../../../components/product/WarrantyClaimCard';

const WarrantyClaimsTabScreen: FC = () => {
  const [metadata, setMetadata] = useState<ReadAllMetadata>({
    total: 0,
  });
  const [readAllPayload, setReadAllPayload] =
    useState<ReadAllWarrantyClaimsPayload>({
      page: 1,
      sort: SortDirection.Desc,
      sort_by: WarrantyClaimSortProperty.UpdatedAt,
    });
  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  const [readAll, readAllStatus] = warrantyClaimApi.useLazyReadAllQuery();

  const isLoading = useMemo(() => {
    return readAllStatus.isLoading || readAllStatus.isFetching;
  }, [readAllStatus]);

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
      setReadAllPayload(payload);
      setWarrantyClaims([...warrantyClaims, ...data]);
    },
    [
      readAll,
      setMetadata,
      setReadAllPayload,
      setWarrantyClaims,
      warrantyClaims,
    ],
  );

  const handleFetchNext = useCallback(async () => {
    if (metadata.total > warrantyClaims.length) {
      await handleFetch({
        ...readAllPayload,
        page: (readAllPayload.page as number) + 1,
      });
    }
  }, [metadata, warrantyClaims, handleFetch, readAllPayload]);

  const handleRefresh = useCallback(() => {
    setReadAllPayload({
      ...readAllPayload,
      page: 0,
    });
    setWarrantyClaims([]);
  }, [setReadAllPayload, readAllPayload, setWarrantyClaims]);

  useEffect(() => {
    if (!warrantyClaims.length) {
      handleFetch(readAllPayload);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      data={warrantyClaims}
      keyExtractor={(warrantyClaim) => warrantyClaim._id}
      onEndReached={handleFetchNext}
      refreshing={isLoading}
      onRefresh={handleRefresh}
      renderItem={({ item: warrantyClaim }) => (
        <WarrantyClaimCard warrantyClaim={warrantyClaim} />
      )}
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

export default WarrantyClaimsTabScreen;
