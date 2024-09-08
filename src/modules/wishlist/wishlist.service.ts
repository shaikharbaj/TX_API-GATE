/**
 * @fileoverview
 * Wishlist service file to handle all wishlist related functionality.
 *
 * @version
 * API version 1.0.
 *
 * @author
 * KATALYST TEAM
 *
 * @license
 * Licensing information, if applicable.
 */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "./module.config";
import { PRODUCT_MS_WISHLIST_PATTERN } from "./pattern";
import { AddToWishListBody, removeFromWishListBody } from "./types";

@Injectable()
export class WishlistService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("fetchAllWishlistProduct");
      this.productClient.subscribeToResponseOf("AddProductToWishList");
      this.productClient.subscribeToResponseOf("RemoveProductFromWishList");

      this.productClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the product of user from wishlist
   */
  async fetchWishList(
    page: number,
    searchText: string,
    lang: string,
    auth: any
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_WISHLIST_PATTERN[MODULE_CONFIG.transport]
            .fetchWishlistProduct,
          { page, searchText, lang, auth }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to add product to wishlist
   */
  async AddToWishlist(auth: any, lang: string, data: AddToWishListBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_WISHLIST_PATTERN[MODULE_CONFIG.transport]
            .AddProductToWishList,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete the product from wishlist
   */
  async removeFromWishList(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_WISHLIST_PATTERN[MODULE_CONFIG.transport]
            .RemoveProductFromWishList,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
