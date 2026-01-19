import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(imageUrl: string) {
    return this.prisma.portfolioItem.create({
      data: { imageUrl },
    });
  }

  remove(id: number) {
    return this.prisma.portfolioItem.delete({
      where: { id },
    });
  }
}