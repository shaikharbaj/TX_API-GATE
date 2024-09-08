/**
 * @fileoverview
 * Category service file to handle all related functionality.
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
import { PRODUCT_MS_PATTERN } from "./pattern";
import { CreateProductBasicInformationBody, CreateProductShippingInformationBody, CreateProductSeoInformationBody } from "./types";

@Injectable()
export class ProductService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("fetchProductBasicInformation");
      this.productClient.subscribeToResponseOf("createProductBasicInformation");
      this.productClient.subscribeToResponseOf("fetchProductVariants");
      this.productClient.subscribeToResponseOf("createProductVariants");
      this.productClient.subscribeToResponseOf("fetchAllProductForShop");
      this.productClient.subscribeToResponseOf("fetchProductBySubCategorySlug");
      this.productClient.subscribeToResponseOf("fetchProductByBrandSlug");
      this.productClient.subscribeToResponseOf("fetchProductBySlug");
      this.productClient.subscribeToResponseOf("fetchVariantsByProductId");
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
   * Send message to required micro-service to fetch product by sub-category slug
   */
    async fetchProductBySubCategorySlug(slug: string, lang: string) {
      try {        
        return await lastValueFrom(
          this.productClient.send(
            PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductBySubCategorySlug,
            { slug, lang }
          )
        );
      } catch (error) {
        throw error;
      }
    }

    /**
   * @description
   * Send message to required micro-service to fetch product brand slug
   */
    async fetchProductByBrandSlug(slug: string, lang: string) {
      try {        
        return await lastValueFrom(
          this.productClient.send(
            PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductByBrandSlug,
            { slug, lang }
          )
        );
      } catch (error) {
        throw error;
      }
    }

  /**
   * @description
   * Send message to required micro-service to fetch products for shop
   */
  async fetchAllProductForShop(
    page_size: number,
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllProductForShop,
          { page_size, page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product details by slug
   */
  async fetchProductBySlug(slug: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductBySlug,
          { slug, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product attributes by product id
   */
  async fetchProductAttributesById(parentId: number, lang: string) {
    try {      
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductAttributesById,
          { parentId, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch all the product
  */
  async fetchAllProduct(page_size: number, page: number, searchText: string, is_active: string, sortColumn: string, sortBy: string, auth: any, lang: string) {
    try {

      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchAllProduct,
          { page_size, page, searchText, is_active, sortColumn, sortBy, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product basic information
   */
  async fetchProductBasicInformation(auth: any, lang: string, uuid: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchProductBasicInformation,
          { auth, lang, uuid }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product basic information
   */
  async createProductBasicInformation(
    auth: any,
    lang: string,
    data: CreateProductBasicInformationBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .createProductBasicInformation,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product variants
   */
  async fetchProductVariants(auth: any, lang: string, uuid: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductVariants,
          { auth, lang, uuid }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product variants
   */
  async createProductVariants(
    auth: any,
    lang: string,
    uuid: string,
    data: any
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].createProductVariants,
          { auth, lang, uuid, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product locations
   */
  async fetchProductLocations(auth: any, lang: string, uuid: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductLocations,
          { auth, lang, uuid }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product locations
   */
  async createProductLocations(
    auth: any,
    lang: string,
    uuid: string,
    data: any
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].createProductLocations,
          { auth, lang, uuid, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product shipping information
   */
  async fetchProductShippingInformation(
    auth: any,
    lang: string,
    uuid: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductShippingInformation,
          { auth, lang, uuid }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product shipping information
   */
  async createProductShippingInformation(
    auth: any,
    lang: string,
    uuid: string,
    data: CreateProductShippingInformationBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].createProductShippingInformation,
          { auth, lang, uuid, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch product seo information
   */
  async fetchProductSeoInformation(
    auth: any,
    lang: string,
    uuid: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].fetchProductSeoInformation,
          { auth, lang, uuid }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create product seo information
   */
  async createProductSeoInformation(
    auth: any,
    lang: string,
    uuid: string,
    data: CreateProductSeoInformationBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].createProductSeoInformation,
          { auth, lang, uuid, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
