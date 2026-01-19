import { Body, Controller, Post } from '@nestjs/common';
import { UrgentRequestsService } from './urgent-requests.service';
import { CreateUrgentRequestDto } from './dto/create-urgent-request.dto';

@Controller('urgent-requests')
export class UrgentRequestsController {
  constructor(private readonly urgentRequestsService: UrgentRequestsService) {}

  @Post()
  create(@Body() createDto: CreateUrgentRequestDto) {
    return this.urgentRequestsService.create(createDto);
  }
}
