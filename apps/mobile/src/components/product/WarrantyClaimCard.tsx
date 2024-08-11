import type { FC } from 'react';
import { Card, Text } from 'react-native-paper';

import type { WarrantyClaim } from '../../interfaces/product';

export interface WarrantyClaimCardProps {
  warrantyClaim: WarrantyClaim;
}

const WarrantyClaimCard: FC<WarrantyClaimCardProps> = ({ warrantyClaim }) => {
  return (
    <Card>
      <Card.Title title={warrantyClaim.name} subtitle={warrantyClaim.status} />
      <Card.Content>
        <Text>{warrantyClaim.description}</Text>
      </Card.Content>
    </Card>
  );
};

export default WarrantyClaimCard;
