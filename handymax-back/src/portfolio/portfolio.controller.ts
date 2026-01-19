import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: { imageUrl: string }) {
    return this.portfolioService.create(body.imageUrl);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(+id);
  }
}