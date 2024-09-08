/**
 * @fileoverview
 * Product Rating service file to handle all related functionality.
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
import { PRODUCT_MS_PRODUCT_RATING_PATTERN } from './pattern';
import {
  CreateProductRatingBody,
  ToggleProductRatingVisibilityBody,
} from './types';

@Injectable()
export class ProductRatingService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('findProductRatingById');
      this.masterClient.subscribeToResponseOf('fetchAllDeletedProductRating');
      this.masterClient.subscribeToResponseOf('fetchAllProductRating');
      this.masterClient.subscribeToResponseOf('createProductRating');
      this.masterClient.subscribeToResponseOf('restoreProductRating');
      this.masterClient.subscribeToResponseOf('deleteProductRating');
      this.masterClient.subscribeToResponseOf('toggleProductRatingVisibility');

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
  * Send message to required micro-service to fetch all the product rating
  */
  async fetchAllProductRating(page: number, searchText: string, lang: string) {
    try {

      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport].fetchAllProductRating,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted product rating
   */
  async fetchAllDeletedProductRating(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedProductRating,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product rating by given id
   */
  async findProductRatingById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport].findProductRatingById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product rating
   */
  async createProductRating(auth: any, lang: string, data: CreateProductRatingBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport].createProductRating,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update product rating visibility i.e: active, inactive
   */
  async toggleProductRatingVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleProductRatingVisibilityBody,
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport]
            .toggleProductRatingVisibility,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete product rating
   */
  async deleteProductRating(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport].deleteProductRating,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted product rating
   */
  async restoreProductRating(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_PRODUCT_RATING_PATTERN[MODULE_CONFIG.transport].restoreProductRating,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

}
