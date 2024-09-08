/**
 * @fileoverview
 * Order service file to handle all related functionality.
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
} from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MODULE_CONFIG } from './module.config';
import { PRODUCT_MS_ORDER_PATTERN } from './pattern';
import {
  CreateOrderBody,
  UpdateOrderStatusBody,
  UpdateProductOrderStatusBody
} from './types';

@Injectable()
export class OrderService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('fetchOrderBySeller');
      this.masterClient.subscribeToResponseOf('fetchOrderForAdmin');


      this.masterClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.close();
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch order for seller
  */
  async fetchOrderForSeller(page_size: number, page: number, searchText: string, status: string, sortColumn: string, sortBy: string, lang: string, auth: any) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].fetchOrderForSeller,
          { page_size, page, searchText, status, sortColumn, sortBy, lang, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to fetch order for admin
*/
  async fetchOrderForAdmin(page_size: number, page: number, searchText: string, sortColumn: string, sortBy: string, lang: string, auth: any) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].fetchOrderForAdmin,
          { page_size, page, searchText, sortColumn, sortBy, lang, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to fetch order for user
 */
  async fetchOrderForUser(page_size: number, page: number, searchText: string, sortColumn: string, sortBy: string, lang: string, auth: any) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].fetchOrderForUser,
          { page_size, page, searchText, sortColumn, sortBy, lang, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to create order
 */
  async createOrder(auth: any, lang: string, data: CreateOrderBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].createOrder,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }


  /**
   * @description
   * Send message to required micro-service to update order status
   */
  async updateOrderStatus(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateOrderStatusBody,
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport]
            .updateOrderStatus,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to update visibility i.e: active, inactive
 */
  async updateProductOrderStatus(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateProductOrderStatusBody,
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport]
            .updateProductOrderStatus,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }


  /**
   * @description
   * Send message to required micro-service to fetch order by given id for seller
   */
  async fetchOrderByIdForSeller(uuid: string, lang: string, auth: any) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].fetchOrderByIdForSeller,
          { uuid, lang, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch order by given id for user
  */
  async fetchOrderByIdForUser(uuid: string, lang: string, auth: any) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_ORDER_PATTERN[MODULE_CONFIG.transport].fetchOrderByIdForUser,
          { uuid, lang, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

}