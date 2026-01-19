import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ArticlesModule } from './articles/articles.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UrgentRequestsModule } from './urgent-requests/urgent-requests.module';

@Module({
  imports: [AuthModule, PrismaModule, ServicesModule, ReviewsModule, OrdersModule, FilesModule, PortfolioModule, ArticlesModule, StatisticsModule, UrgentRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
