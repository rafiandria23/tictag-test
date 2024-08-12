import type { FC } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Card, Text } from 'react-native-paper';

import type { WarrantyClaim } from '../../interfaces/product';

export interface WarrantyClaimCardProps {
  warrantyClaim: WarrantyClaim;
}

const WarrantyClaimCard: FC<WarrantyClaimCardProps> = ({ warrantyClaim }) => {
  const router = useRouter();

  const handleDetails = useCallback(() => {
    router.push(`/warranty-claims/${warrantyClaim._id}`);
  }, [router, warrantyClaim]);

  return (
    <Card onPress={handleDetails}>
      <Card.Title
        title={<Text variant="titleSmall">{warrantyClaim.name}</Text>}
      />
      <Card.Content>
        <Text variant="bodySmall">{warrantyClaim.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default WarrantyClaimCard;
