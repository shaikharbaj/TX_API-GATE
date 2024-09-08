import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { AuthModule } from "../auth/auth.module";
import { MODULE_CONFIG } from "./module.config";
import { MODULE_CONFIG as NOTIFICATION_MODULE_CONFIG } from "../notification/module.config";
import {
  AdminController,
  SellerController,
  UserController,
  FinancierController
} from "./controllers";
import { AdminService, SellerService, UserService,FinancierService } from "./services";

const USER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[USER_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [AdminController, UserController, SellerController,FinancierController],
  providers: [AdminService, UserService, SellerService,FinancierService],
  exports: [AdminService, UserService, SellerService,FinancierService],
})
export class UserModule {}
