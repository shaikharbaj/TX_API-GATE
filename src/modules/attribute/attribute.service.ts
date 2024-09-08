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
import { ATTRIBUTE_PRODUCT_MS_PATTERN } from "./pattern";
import {
  CreateAttributeBody,
  ToggleAttributeVisibilityBody,
  UpdateAttributeBody,
} from "./types";

@Injectable()
export class AttributeService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("fetchAllAttribute");
      this.productClient.subscribeToResponseOf("fetchAllDeletedAttribute");
      this.productClient.subscribeToResponseOf("fetchAllAttributeForDropdown");
      this.productClient.subscribeToResponseOf("findAttributeById");
      this.productClient.subscribeToResponseOf("createAttribute");
      this.productClient.subscribeToResponseOf("toggleAttriubuteVisibility");
      this.productClient.subscribeToResponseOf("updateAttribute");
      this.productClient.subscribeToResponseOf("deleteAttribute");
      this.productClient.subscribeToResponseOf("restoreAttribute");

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
   * Send message to required micro-service to fetch all the attribute
   */
  async fetchAllAttribute(page_size: number, page: number, searchText: string, is_active: string, sortColumn: string, sortBy: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAttribute,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted attribute
   */
  async fetchAllDeletedAttribute(
    page_size: number, page: number, searchText: string, lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedAttribute,
          { page_size, page, searchText, lang },
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the attribute for dropdown
   */
  async fetchAllAttributeForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAttributeForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch attribute by category
   */
  async fetchAttributeByCategory(categoryId: number, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAttributeByCategory,
          { categoryId, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch attribute by given id
   */
  async findAttributeById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .findAttributeById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create attribute
   */
  async createAttribute(auth: any, lang: string, data: CreateAttributeBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].createAttribute,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update attribute visibility i.e: active, inactive
   */
  async toggleAttributeVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleAttributeVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .toggleAttributeVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update attribute
   */
  async updateAttribute(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateAttributeBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].updateAttribute,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete attribute
   */
  async deleteAttribute(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport].deleteAttribute,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted attribute
   */
  async restoreAttribute(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .restoreAttribute,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
