/**
 * @fileoverview
 * Global setting service file to handle all related functionality.
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
} from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MODULE_CONFIG } from './module.config';
import { MASTER_MS_GLOBAL_SETTING_PATTERN } from './pattern';
import {
  UpdateGlobalSettingBody,
} from './types';

@Injectable()
export class GlobalSettingService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("MASTER_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('fetchAllGlobalSetting');
      this.masterClient.subscribeToResponseOf('updateGlobalSetting');

      this.masterClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.close();
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch all the global setting
  */
  async fetchAllGlobalSetting(page: number, searchText: string, lang: string,) {
    try {

      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_GLOBAL_SETTING_PATTERN[MODULE_CONFIG.transport].fetchAllGlobalSetting,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }


  /**
   * @description
   * Send message to required micro-service to update global setting
   */
  async updateGlobalSetting(auth: any, lang: string, data: UpdateGlobalSettingBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_GLOBAL_SETTING_PATTERN[MODULE_CONFIG.transport].updateGlobalSetting,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete global setting
   */
  async deleteGlobalSetting(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_GLOBAL_SETTING_PATTERN[MODULE_CONFIG.transport].deleteGlobalSetting,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
