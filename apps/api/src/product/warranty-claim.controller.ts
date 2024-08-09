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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { DocsTag } from '../common/common.constant';
import { CommonService } from '../common/common.service';
import { Action } from '../casl/casl.constant';
import { CheckPolicy } from '../casl/casl.decorator';
import { PolicyGuard } from '../casl/guards/policy.guard';
import { AuthUser } from '../auth/auth.interface';
import { Auth } from '../auth/auth.decorator';

import { WarrantyClaim } from './schemas/warranty-claim.schema';
import { CreateWarrantyClaimDto } from './dtos/create-warranty-claim.dto';
import { ReadWarrantyClaimByIdDto } from './dtos/read-warranty-claim-by-id.dto';
import { CustomerReadAllWarrantyClaimsDto } from './dtos/customer-read-all-warranty-claims.dto';
import { ProductService } from './product.service';

@Controller('/warranty-claims')
@UseGuards(PolicyGuard)
@ApiTags(DocsTag.Product)
@ApiBearerAuth()
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
      .where({
        submitted_by: new Types.ObjectId(authUser.id),
      })
      .lean()
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
    @Query() queries: CustomerReadAllWarrantyClaimsDto,
  ) {
    return this.productService.readAllWarrantyClaims({
      ...queries,
      submitted_by: authUser.id,
    });
  }
}
