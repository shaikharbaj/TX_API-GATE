import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { MODULE_CONFIG } from "./module.config";
import { AuthModule } from "../auth/auth.module";
import { AttributeController } from "./attribute.controller";
import { AttributeService } from "./attribute.service";

const MASTER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[MASTER_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}
