/**
 * @fileoverview
 * Warehouse service file to handle all related functionality.
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
import { PRODUCT_MS_WAREHOUSE_PATTERN } from "./pattern";
import {
  CreateWarehouseBody,
  ToggleWarehouseVisibilityBody,
  UpdateWarehouseBody,
} from "./types";
import { ToggleIndustryVisibilityBody } from "../industry/types";

@Injectable()
export class WarehouseService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.subscribeToResponseOf("fetchAllWarehouse");
      this.masterClient.subscribeToResponseOf("fetchAllDeletedWarehouse");
      this.masterClient.subscribeToResponseOf("fetchAllWarehouseForDropdown");
      this.masterClient.subscribeToResponseOf("createWarehouse");
      this.masterClient.subscribeToResponseOf("findWarehouseById");
      this.masterClient.subscribeToResponseOf("restoreWarehouse");
      this.masterClient.subscribeToResponseOf("deleteWarehouse");

      try {
        this.masterClient.connect();
        console.log("Connected to Kafka successfully");
      } catch (error) {
        console.error("Failed to connect to Kafka", error.message);
      }
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the warehouse
   */
  async fetchAllWarehouse(
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
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .fetchAllWarehouse,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted warehouse
   */
  async fetchAllDeletedWarehouse(
    page_size: number,
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedWarehouse,
          { page_size, page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the warehouse for dropdown
   */
  async fetchAllWarehouseForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .fetchAllWarehouseForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create warehouse
   */
  async createWarehouse(auth: any, data: CreateWarehouseBody, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport].createWarehouse,
          { auth, lang, ...data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch warehouse by given id
   */
  async findWarehouseById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .findWarehouseById,
          { uuid, lang }
        )
      );
    } catch (error) {
      console.log(
        "error from api service find_warehouseby id ::::::::::::::::::",
        error
      );

      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update warehouse visibility i.e: active, inactive
   */
  async toggleWarehouseVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleIndustryVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .toggleWarehouseVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update warehouse
   */
  async updateWarehouse(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateWarehouseBody
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport].updateWarehouse,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore warehouse
   */
  async restoreWarehouse(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport]
            .restoreWarehouse,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete warehouse
   */
  async deleteWarehouse(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          PRODUCT_MS_WAREHOUSE_PATTERN[MODULE_CONFIG.transport].deleteWarehouse,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
