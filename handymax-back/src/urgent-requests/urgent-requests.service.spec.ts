import { Test, TestingModule } from '@nestjs/testing';
import { UrgentRequestsService } from './urgent-requests.service';

describe('UrgentRequestsService', () => {
  let service: UrgentRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgentRequestsService],
    }).compile();

    service = module.get<UrgentRequestsService>(UrgentRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
