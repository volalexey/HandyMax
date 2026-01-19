import { Module } from '@nestjs/common';
import { UrgentRequestsService } from './urgent-requests.service';
import { UrgentRequestsController } from './urgent-requests.controller';

@Module({
  controllers: [UrgentRequestsController],
  providers: [UrgentRequestsService],
})
export class UrgentRequestsModule {}
