import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { subWeeks, subMonths } from 'date-fns';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStats(period: 'week' | 'month' = 'week') {
    const now = new Date();
    const startDate = period === 'week' ? subWeeks(now, 1) : subMonths(now, 1);
    
    const orders = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
      },
    });

    const totalOrders = orders.length;

    const processed = orders.filter(o => o.status === 'COMPLETED').length; 
    const waiting = orders.filter(o => o.status === 'PENDING' || o.status === 'IN_PROGRESS').length;
    const rejected = orders.filter(o => o.status === 'CANCELLED').length;

    const totalIncome = orders
      .filter(o => o.status === 'COMPLETED')
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const newCustomers = await this.prisma.user.count({
      where: {
        createdAt: { gte: startDate },
        role: 'USER',
      },
    });

    const topUsersGroup = await this.prisma.order.groupBy({
      by: ['userId'],
      _count: { userId: true },
      orderBy: { _count: { userId: 'desc' } },
      take: 5,
    });

    const topCustomers = await Promise.all(
      topUsersGroup.map(async (item) => {
        const user = await this.prisma.user.findUnique({
          where: { id: item.userId },
          select: { name: true, phone: true },
        });
        return {
          name: user?.name || 'Unknown',
          phone: user?.phone || '-',
          count: item._count.userId,
        };
      })
    );
    
   const repeatOrdersGroup = await this.prisma.order.groupBy({
       by: ['userId'],
       where: { createdAt: { gte: startDate } },
       _count: { userId: true },
       having: { userId: { _count: { gt: 1 } } }
    });
    const repeatOrdersCount = repeatOrdersGroup.length;

    const topServicesGroup = await this.prisma.orderItem.groupBy({
      by: ['serviceId'],
      where: {
        order: {
            createdAt: { gte: startDate }
        }
      },
      _sum: { quantity: true }, 
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const topServices = await Promise.all(
      topServicesGroup.map(async (item) => {
        const service = await this.prisma.service.findUnique({
          where: { id: item.serviceId },
          select: { title: true },
        });
        return {
           title: service?.title || 'Deleted Service',
           count: item._sum.quantity || 0
        };
      })
    );

    return {
      orders: {
        total: totalOrders,
        processed,
        waiting,
        rejected,
      },
      income: totalIncome,
      customers: {
        new: newCustomers,
        repeat: repeatOrdersCount,
        top: topCustomers,
      },
      services: topServices,
    };
  }
}