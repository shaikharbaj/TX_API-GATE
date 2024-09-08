/**
 * @fileoverview
 * Role service file to handle all role logic functionality.
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
import { ROLE_PATTERN } from "./pattern";
import { MODULE_CONFIG } from "./module.config";
import { CreateRoleBody } from "./types";

@Injectable()
export class RoleService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("fetchAllRole");
      this.userClient.subscribeToResponseOf("fetchAllRoleForDropdown");
      this.userClient.subscribeToResponseOf("findRoleById");
      this.userClient.subscribeToResponseOf("createRole");
      this.userClient.subscribeToResponseOf("updateRole");
      this.userClient.subscribeToResponseOf("deleteRole");
      this.userClient.subscribeToResponseOf("toggleRoleVisibility");
      this.userClient.subscribeToResponseOf("attachPermissionsToRole");
      this.userClient.subscribeToResponseOf("fetchRolesPermissions");
      this.userClient.subscribeToResponseOf("fetchAllRolesMeta");
      this.userClient.subscribeToResponseOf("fetchAllRolesDeleted");
      this.userClient.subscribeToResponseOf("restoreRoleById");
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
   * Send message to required micro-service to fetch all the role
   */
  async fetchAllRole(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRole,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted role
   */
  async fetchAllRolesDeleted(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRolesDeleted,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the role for dropdown
   */
  async fetchAllRoleForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRoleForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch roles meta Obj
   */
  async fetchAllRolesMeta(lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRolesMeta,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch role by given id
   */
  async findRoleById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].findRoleById,
          { uuid: uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to role create
   */
  async createRole(auth: any, data: CreateRoleBody, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].createRole, {
          auth,
          data,
          lang,
        })
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update role visibility i.e: active, inactive
   */
  async toggleRoleVisibility(uuid: string, data: any, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].toggleRoleVisibility,
          {
            auth,
            uuid,
            data,
            lang,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update role
   */
  async updateRole(uuid: string, auth: any, data: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].updateRole, {
          uuid,
          auth,
          data,
          lang,
        })
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete role
   */
  async deleteRole(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].deleteRole, {
          uuid,
          auth,
          lang,
        })
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore role by given id
   */
  async restoreRoleById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].restoreRoleById,
          { uuid: uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to add permission to role
   */
  async attachPermissionsToRole(auth: any, data: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].attachPermissionsToRole,
          {
            auth,
            data,
            lang,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch permissions of requested roles
   */
  async fetchRolesPermissions(roleIds: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchRolesPermissions,
          { roleIds: roleIds, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
