import { OmitType } from '@nestjs/swagger';

import { ReadAllWarrantyClaimsDto } from './read-all-warranty-claims.dto';

export class CustomerReadAllWarrantyClaimsDto extends OmitType(
  ReadAllWarrantyClaimsDto,
  ['product', 'submitted_by', 'confirmed_by'],
) {}
