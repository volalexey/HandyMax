import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUrgentRequestDto } from './dto/create-urgent-request.dto';

@Injectable()
export class UrgentRequestsService {
    constructor(private prisma: PrismaService) {}

  create(createDto: CreateUrgentRequestDto) {
    return this.prisma.urgentRequest.create({
      data: createDto,
    });
  }

  findAll() {
    return this.prisma.urgentRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
