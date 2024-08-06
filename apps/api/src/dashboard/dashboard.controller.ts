import {
  Controller,
  UseGuards,
  Post,
  Get,
  Put,
  Patch,
  Delete,
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

import { DashboardService } from './dashboard.service';

@Controller('/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly commonService: CommonService,
  ) {}
}
