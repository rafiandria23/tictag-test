import {
  Controller,
  UseGuards,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { WarrantyClaim } from './schemas/warranty-claim.schema';
import { CreateWarrantyClaimDto } from './dtos/create-warranty-claim.dto';
import { ReadWarrantyClaimByIdDto } from './dtos/read-warranty-claim-by-id.dto';
import { ReadAllWarrantyClaimsDto } from './dtos/read-all-warranty-claims.dto';
import { ProductService } from './product.service';

@Controller('/warranty-claims')
@UseGuards(PolicyGuard)
export class WarrantyClaimController {
  constructor(
    private readonly productService: ProductService,
    private readonly commonService: CommonService,
  ) {}

  @Post('/')
  @CheckPolicy((ability) => ability.can(Action.Create, WarrantyClaim))
  @HttpCode(HttpStatus.CREATED)
  public create(
    @Auth() authUser: AuthUser,
    @Body() payload: CreateWarrantyClaimDto,
  ) {
    return this.productService.createWarrantyClaim(authUser.id, payload);
  }

  @Get('/:id')
  @CheckPolicy((ability) => ability.can(Action.Read, WarrantyClaim))
  public async readById(
    @Auth() authUser: AuthUser,
    @Param() params: ReadWarrantyClaimByIdDto,
  ) {
    const existingWarrantyClaim = await this.productService
      .readWarrantyClaimById(params.id)
      .where('submitted_by', authUser.id)
      .exec();

    if (!existingWarrantyClaim) {
      throw new UnprocessableEntityException('Warranty claim does not exist!');
    }

    return this.commonService.successTimestamp({
      data: existingWarrantyClaim,
    });
  }

  @Get('/')
  @CheckPolicy((ability) => ability.can(Action.Read, WarrantyClaim))
  public readAll(
    @Auth() authUser: AuthUser,
    @Query() queries: ReadAllWarrantyClaimsDto,
  ) {
    return this.productService.readAllWarrantyClaims({
      ...queries,
      submitted_by: authUser.id,
    });
  }
}
