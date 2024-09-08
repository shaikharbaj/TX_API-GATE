import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { MODULE_CONFIG } from './module.config';
import { FaqCategoryController } from './faq-category.controller';
import { FaqCategoryService } from './faq-category.service';

const FAQ_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[FAQ_MS_TRANSPORT]]),
    AuthModule,
  ],
  providers: [FaqCategoryService],
  controllers: [FaqCategoryController],
})
export class FaqCategoryModule { }
