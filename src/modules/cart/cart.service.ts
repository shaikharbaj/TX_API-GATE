/**
 * @fileoverview
 * Cart service file to handle all related functionality.
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
import { PRODUCT_MS_CART_PATTERN } from "./pattern";
import { addProductToCartBody } from "./types";

@Injectable()
export class CartService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("fetchCartProduct");
      this.productClient.subscribeToResponseOf("addProductToCart");
      this.productClient.subscribeToResponseOf("updateCart");
      this.productClient.subscribeToResponseOf("removeProductFromCart");
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
   * Send message to required micro-service to fetch all the product of from cart.
   */
  async fetchCartProduct(page: number, searchText: string, lang: string,auth:any) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CART_PATTERN[MODULE_CONFIG.transport].fetchCartProduct,
          { page, searchText, lang,auth }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to add product to cart
   */
  async addProductToCart(auth: any, lang: string, data: addProductToCartBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CART_PATTERN[MODULE_CONFIG.transport].addProductToCart,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update cart
   */
  async updateCart(uuid: string, auth: any, payload: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CART_PATTERN[MODULE_CONFIG.transport].updateCart,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete the product from cart
   */
  async removeProductFromCart(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CART_PATTERN[MODULE_CONFIG.transport]
            .removeProductFromCart,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
