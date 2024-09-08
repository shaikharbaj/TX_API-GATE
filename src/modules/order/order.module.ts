import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthModule } from '../auth/auth.module';

const PRODUCT_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[PRODUCT_MS_TRANSPORT]]), AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
