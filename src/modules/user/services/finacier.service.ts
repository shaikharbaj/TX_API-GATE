/**
 * @fileoverview
 * Auth service file to handle all authentication functionality.
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
  NotFoundException,
} from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "../module.config";
import { USER_MS_FINANCIER_PATTERN } from "../pattern";

@Injectable()
export class FinancierService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("fetchAllFinanciers");
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the financiers
   */
  async fetchAllFinanciers(
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
        this.userClient.send(
          USER_MS_FINANCIER_PATTERN[MODULE_CONFIG.transport].fetchAllFinanciers,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch financier basic details by id
   */
  async fetchFinancierBasicDetailsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_FINANCIER_PATTERN[MODULE_CONFIG.transport]
            .fetchFinancierBasicDetailsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  
}
