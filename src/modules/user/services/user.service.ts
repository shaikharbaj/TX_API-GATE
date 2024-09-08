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
import { ClientKafka, ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "../module.config";
import { USER_MS_BUYER_PATTERN, USER_MS_PATTERN } from "../pattern";

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("fetchAllBuyers");
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the customers/buyers
   */
  async fetchAllBuyers(
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
          USER_MS_PATTERN[MODULE_CONFIG.transport].fetchAllBuyers,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description
   * Send message to required micro-service to fetch buyer profile
   */
  async fetchBuyerProfile(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_BUYER_PATTERN[MODULE_CONFIG.transport].fetchBuyerProfile,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch user by given reset token
   */
  async fetchUserByResetToken(token: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].fetchUserByResetToken,
          { token, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch buyer basic details by id
   */
  async fetchBuyerBasicDetailsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].fetchUsersBasicDetailsId,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
