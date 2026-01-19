import { Test, TestingModule } from '@nestjs/testing';
import { UrgentRequestsController } from './urgent-requests.controller';
import { UrgentRequestsService } from './urgent-requests.service';

describe('UrgentRequestsController', () => {
  let controller: UrgentRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrgentRequestsController],
      providers: [UrgentRequestsService],
    }).compile();

    controller = module.get<UrgentRequestsController>(UrgentRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
