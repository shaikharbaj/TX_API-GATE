/**
 * @fileoverview
 * Uom service file to handle all related functionality.
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
import { PRODUCT_MS_UOM_PATTERN } from "./pattern";
import { CreateUomBody, ToggleUomVisibilityBody, UpdateUomBody } from "./types";

@Injectable()
export class UomService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.subscribeToResponseOf("findUomById");
      this.masterClient.subscribeToResponseOf("fetchAllDeletedUom");
      this.masterClient.subscribeToResponseOf("fetchAllUomForDropdown");
      this.masterClient.subscribeToResponseOf("fetchAllUom");
      this.masterClient.subscribeToResponseOf("createUom");
      this.masterClient.subscribeToResponseOf("restoreUom");
      this.masterClient.subscribeToResponseOf("updateUom");
      this.masterClient.subscribeToResponseOf("deleteUom");
      this.masterClient.subscribeToResponseOf("toggleUomVisibility");
      this.masterClient.subscribeToResponseOf("fetchRoundRule");
      this.masterClient.subscribeToResponseOf("fetchRoundValue");
      this.masterClient.subscribeToResponseOf("fetchUomByIdForDropdown");
      this.masterClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the uom
   */
  async fetchAllUom(
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
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].fetchAllUom,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted uom
   */
  async fetchAllDeletedUom(
    page_size: number,
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].fetchAllDeletedUom,
          { page_size, page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the uom for dropdown
   */
  async fetchAllUomForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport]
            .fetchAllUomForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch uom by given id
   */
  async findUomById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].findUomById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create uom
   */
  async createUom(auth: any, lang: string, data: CreateUomBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].createUom,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update uom visibility i.e: active, inactive
   */
  async toggleUomVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleUomVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].toggleUomVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update uom
   */
  async updateUom(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateUomBody
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].updateUom,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete uom
   */
  async deleteUom(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].deleteUom,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted uom
   */
  async restoreUom(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].restoreUom,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch round rule
   *
   */
  async fetchRoundRule(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].fetchRoundRule,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch round values
   *
   */
  async fetchRoundValue(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport].fetchRoundValue,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch uom by id for dropdown
   */
  async fetchUomByIdForDropdown(id: number, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_UOM_PATTERN[MODULE_CONFIG.transport]
            .fetchUomByIdForDropdown,
          { id, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
