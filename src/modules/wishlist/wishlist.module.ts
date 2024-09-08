import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { MODULE_CONFIG } from "./module.config";
import { AuthModule } from "../auth/auth.module";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";

const PRODUCT_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[PRODUCT_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
