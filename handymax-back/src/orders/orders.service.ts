import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const { items } = createOrderDto;

    const orderItemsData: any = [];
    let total = 0;

    for (const item of items) {
      const service = await this.prisma.service.findUnique({
        where: { id: item.serviceId },
      });

      if(!service) {
        throw new BadRequestException(`Service with ID ${item.serviceId} not found`);
      }

      total += service.price * item.quantity;
      orderItemsData.push({
        serviceId: service.id,
        quantity: item.quantity,
        price: service.price,
      });
    }

    return this.prisma.order.create({
      data: {
        userId,
        totalPrice: total,
        status: 'PENDING',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { service: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { service: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: { include: { service: true } },
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { status } = updateOrderDto;

    return this.prisma.order.update({
      where: { id },
      data: {
        status
      },
    });
  }
}
