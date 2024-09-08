/**
 * @fileoverview
 * Admin service file to handle all admin functionality.
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
import { USER_MS_ADMIN_PATTERN } from "../pattern";
import {
  CreateAdminUserBody,
  ToggleAdminUserVisibilityBody,
  UpdateAdminUserBody,
  UpdateAdminUserPasswordBody,
  UpdateBankingInfoStatusBody,
  UpdateBasicInfoStatusBody,
  UpdateDocumentStatusBody,
  UpdateVerificationStatusBody,
} from "../types";

@Injectable()
export class AdminService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("fetchAllAdminUser");
      this.userClient.subscribeToResponseOf("fetchAllDeletedAdminUser");
      this.userClient.subscribeToResponseOf("findAdminUserById");
      this.userClient.subscribeToResponseOf("findAdminUserProfile");
      this.userClient.subscribeToResponseOf("createAdminUser");
      this.userClient.subscribeToResponseOf("toggleAdminUserVisibility");
      this.userClient.subscribeToResponseOf("updateAdminUser");
      this.userClient.subscribeToResponseOf("updateAdminUserPassword");
      this.userClient.subscribeToResponseOf("deleteAdminUser");
      this.userClient.subscribeToResponseOf("restoreAdminUser");
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
   * Send message to required micro-service to fetch all the country
   */
  async fetchAllAdminUser(
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
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].fetchAllAdminUser,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted admin users
   */
  async fetchAllDeletedAdminUser(
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedAdminUser,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the admin user in dropdown
   */
  async fetchAllAdminUserForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAdminUserForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch admin user by given uuid
   */
  async findAdminUserById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].findAdminUserById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create new admin user
   */
  async createAdminUser(auth: any, data: CreateAdminUserBody, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].createAdminUser,
          { auth, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update admin user visibility i.e: active, inactive
   */
  async toggleAdminUserVisibility(
    uuid: string,
    auth: any,
    payload: ToggleAdminUserVisibilityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .toggleAdminUserVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update admin user
   */
  async updateAdminUser(
    uuid: string,
    auth: any,
    payload: UpdateAdminUserBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].updateAdminUser,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete admin user
   */
  async deleteAdminUser(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].deleteAdminUser,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted admin user
   */
  async restoreAdminUser(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].restoreAdminUser,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch admin user by given uuid
   */
  async fetchAdminProfile(auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].findAdminUserProfile,
          { auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update admin user password
   */
  async updateAdminUserPassword(
    auth: any,
    payload: UpdateAdminUserPasswordBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .updateAdminUserPassword,
          { auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update onboarding basic information status
   */
  async updateBasicInformationStatus(
    uuid: string,
    auth: any,
    payload: UpdateBasicInfoStatusBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .updateBasicInformationStatus,
          { uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update onboarding banking information status
   */
  async updateBankingInformationStatus(
    uuid: string,
    auth: any,
    payload: UpdateBankingInfoStatusBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .updateBankingInformationStatus,
          { uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update onboarding verification status
   */
  async updateVerificationStatus(
    uuid: string,
    auth: any,
    payload: UpdateVerificationStatusBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .updateVerificationStatus,
          { uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update onboarding  document status
   */
  async updateDocumentStatus(
    uuid: string,
    auth: any,
    payload: UpdateDocumentStatusBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].updateDocumentStatus,
          { uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch admin user basic details by id
   */
  async fetchAdminUserBasicDetailsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .fetchAdminUserBasicDetailsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
