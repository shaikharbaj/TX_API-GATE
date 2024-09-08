
/**
 * @fileoverview
 * Attribute value service file to handle all related functionality.
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
import { ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN } from "./pattern";
import {
  CreateAttributeValueBody,
  ToggleAttributeValueVisibilityBody,
  UpdateAttributeValueBody,
} from "./types";

@Injectable()
export class AttributeValueService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("fetchAllAttributeValue");
      this.productClient.subscribeToResponseOf("fetchAllDeletedAttributeValue");
      this.productClient.subscribeToResponseOf(
        "fetchAllAttributeValueForDropdown"
      );
      this.productClient.subscribeToResponseOf("findAttributeValueById");
      this.productClient.subscribeToResponseOf("createAttributeValue");
      this.productClient.subscribeToResponseOf(
        "toggleAttributeValueVisibility"
      );
      this.productClient.subscribeToResponseOf("updateAttributeValue");
      this.productClient.subscribeToResponseOf("deleteAttributeValue");
      this.productClient.subscribeToResponseOf("restoreAttributeValue");

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
   * Send message to required micro-service to fetch all the attribute value
   */
  async fetchAllAttributeValue(page_size: number, page: number, searchText: string, is_active: string, sortColumn: string, sortBy: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAttributeValue,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted attribute value
   */
  async fetchAllDeletedAttributeValue(
    page_size: number, page: number, searchText: string, lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedAttributeValue,
          { page_size, page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the attribute value for dropdown
   */
  async fetchAllAttributeValueForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAttributeValueForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch attribute value by given id
   */
  async findAttributeValueById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .findAttributeValueById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create attribute value
   */
  async createAttributeValue(
    auth: any,
    lang: string,
    data: CreateAttributeValueBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .createAttributeValue,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update attribute value visibility i.e: active, inactive
   */
  async toggleAttributeValueVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleAttributeValueVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .toggleAttributeValueVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update attribute value
   */
  async updateAttributeValue(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateAttributeValueBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .updateAttributeValue,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete attribute value
   */
  async deleteAttributeValue(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .deleteAttributeValue,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted attribute value
   */
  async restoreAttributeValue(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN[MODULE_CONFIG.transport]
            .restoreAttributeValue,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
