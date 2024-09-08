import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { UomController } from './uom.controller';
import { UomService } from './uom.service';
import { AuthModule } from '../auth/auth.module';

const PRODUCT_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[PRODUCT_MS_TRANSPORT]]), AuthModule],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule { }
