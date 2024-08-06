import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { CaslModule } from '../casl/casl.module';
import { ProductModule } from '../product/product.module';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [CommonModule, CaslModule, ProductModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
