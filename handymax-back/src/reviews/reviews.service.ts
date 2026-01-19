import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: number) {
    const { serviceId, ...rest } = createReviewDto;

    return this.prisma.review.create({
      data: {
        ...rest,
        isApproved: false,
        user: { connect: { id: userId } },
        service: { connect: { id: +serviceId } },
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        service: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findApproved() {
    return this.prisma.review.findMany({
      where: { isApproved: true },
      include: {
        user: { select: { name: true } },
        service: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }

  async approve(id: number) {
    return this.prisma.review.update({
      where: { id },
      data: { isApproved: true },
    })
  }
}
