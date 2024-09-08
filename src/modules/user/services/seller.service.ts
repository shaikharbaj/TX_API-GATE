/**
 * @fileoverview
 * Seller service file to handle all seller functionality.
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
import { MODULE_CONFIG } from "../module.config";
import { USER_MS_SELLER_PATTERN } from "../pattern";
import {
  SellerBankDetailBody,
  SellerBasicDetailBody,
  SellerDocumentsBody,
  SellerVerificationBody,
} from "../types";

@Injectable()
export class SellerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("fetchSellerProfile");
      this.userClient.subscribeToResponseOf("fetchBasicDetails");
      this.userClient.subscribeToResponseOf("createUpdateBasicDetails");
      this.userClient.subscribeToResponseOf("createUpdateBankDetails");
      this.userClient.subscribeToResponseOf("fetchAllSeller");
      this.userClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the sellers
   */
  async fetchAllSeller(
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
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].fetchAllSeller,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch seller profile
   */
  async fetchSellerProfile(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].fetchSellerProfile,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch basic details
   */
  async fetchBasicDetails(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].fetchBasicDetails,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create and update basic details
   */
  async createUpdateBasicDetails(
    auth: any,
    payload: SellerBasicDetailBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .createUpdateBasicDetails,
          { auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch bank details
   */
  async fetchBankDetails(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].fetchBankDetails,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create and update bank details
   */
  async createUpdateBankDetails(
    auth: any,
    payload: SellerBankDetailBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .createUpdateBankDetails,
          { auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch verification details
   */
  async fetchVerificationDetails(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .fetchVerificationDetails,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create and update verification
   */
  async createUpdateVerification(
    auth: any,
    file: any,
    payload: SellerVerificationBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .createUpdateVerification,
          { auth, file, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch documents details
   */
  async fetchDocumentsDetails(auth: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].fetchDocumentsDetails,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create and update documents
   */
  async createUpdateDocuments(
    auth: any,
    files: Record<string, Express.Multer.File | undefined>,
    payload: SellerDocumentsBody,
    lang: string
  ) {
    try {
      const requestData = {
        auth,
        files,
        data: payload,
        lang,
      };
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport].createUpdateDocuments,
          requestData
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch seller bank details by id
   */
  async fetchSellerBankDetailsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .fetchSellerBankDetailsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch users basic details by id
   */
  async fetchSellerBasicDetailsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .fetchSellerBasicDetailsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch users verification details by id
   */
  async fetchSellerVerificationById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .fetchSellerVerificationById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch seller document details by id
   */
  async fetchSellerDocumentsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_SELLER_PATTERN[MODULE_CONFIG.transport]
            .fetchSellerDocumentsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
