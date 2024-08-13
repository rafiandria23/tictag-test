import _ from 'lodash';
import type { FC } from 'react';
import { Chip, MD3Colors } from 'react-native-paper';

import { WarrantyClaimStatus } from '../../constants/product';

export interface WarrantyClaimStatusChipProps {
  status: WarrantyClaimStatus;
}

const WarrantyClaimStatusChip: FC<WarrantyClaimStatusChipProps> = ({
  status,
}) => {
  return <Chip>{_.capitalize(status)}</Chip>;
};

export default WarrantyClaimStatusChip;
