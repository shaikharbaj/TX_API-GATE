import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { AuthModule } from '../auth/auth.module';

const PRODUCT_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[PRODUCT_MS_TRANSPORT]]), AuthModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule { }
