/**
 * @fileoverview
 * Industry service file to handle all related functionality.
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
import { PRODUCT_MS_INDUSTRY_PATTERN } from "./pattern";
import {
  CreateIndustryBody,
  ToggleIndustryVisibilityBody,
  UpdateIndustryBody,
} from "./types";

@Injectable()
export class IndustryService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("findIndustryById");
      this.productClient.subscribeToResponseOf("fetchAllDeletedIndustry");
      this.productClient.subscribeToResponseOf("fetchAllIndustryForDropdown");
      this.productClient.subscribeToResponseOf("fetchAllIndustry");
      this.productClient.subscribeToResponseOf("createIndustry");
      this.productClient.subscribeToResponseOf("restoreIndustry");
      this.productClient.subscribeToResponseOf("updateIndustry");
      this.productClient.subscribeToResponseOf("deleteIndustry");
      this.productClient.subscribeToResponseOf("toggleIndustryVisibility");

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
   * Send message to required micro-service to fetch all the industry
   */
  async fetchAllIndustry(
    page_size: number,
    page: number,
    searchText: string,
    is_active: string,
    sortColumn: string,
    sortBy: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].fetchAllIndustry,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted industry
   */
  async fetchAllDeletedIndustry(
    page_size: number,
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedIndustry,
          { page_size, page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the industry for dropdown
   */
  async fetchAllIndustryForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllIndustryForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch industry by given id
   */
  async findIndustryById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].findIndustryById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create industry
   */
  async createIndustry(auth: any, lang: string, data: CreateIndustryBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].createIndustry,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update industry visibility i.e: active, inactive
   */
  async toggleIndustryVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleIndustryVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport]
            .toggleIndustryVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update industry
   */
  async updateIndustry(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateIndustryBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].updateIndustry,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete industry
   */
  async deleteIndustry(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].deleteIndustry,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted industry
   */
  async restoreIndustry(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_INDUSTRY_PATTERN[MODULE_CONFIG.transport].restoreIndustry,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
