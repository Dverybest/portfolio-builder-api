import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [DashboardController],
  providers: []
})
export class DashboardModule {}
