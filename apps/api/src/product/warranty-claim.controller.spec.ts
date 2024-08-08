import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyClaimController } from './warranty-claim.controller';

describe('WarrantyClaimController', () => {
  let controller: WarrantyClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyClaimController],
    }).compile();

    controller = module.get<WarrantyClaimController>(WarrantyClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
