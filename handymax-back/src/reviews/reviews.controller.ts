import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const userId = req.user.userId;
    return this.reviewsService.create(createReviewDto, userId);
  }

  @Get()
  findPublic() {
    return this.reviewsService.findApproved();
  }

  @Get('admin/all')
  @UseGuards(AuthGuard('jwt'))
  //TODO: Add admin role check 
  findAllForAdmin() {
    return this.reviewsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
