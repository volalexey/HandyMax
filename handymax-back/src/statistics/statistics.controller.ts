import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getStats(@Query('period') period: 'week' | 'month') {
    return this.statisticsService.getStats(period);
  }
}
