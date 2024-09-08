/**
 * @fileoverview
 * Faq service file to handle all related functionality.
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
import { CMS_MS_FAQ_CATEGORY_PATTERN } from './pattern';

@Injectable()
export class FaqCategoryService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('CMS_MICROSERVICE')
    private readonly cmsClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.cmsClient.subscribeToResponseOf('fetchAllFaqCategoryForDropdown')
      this.cmsClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.cmsClient.close();
    }
  }

  /**
* @description
* Send message to required micro-service to fetch all the faq category for dropdown
*/
  async fetchAllFaqCategoryForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_CATEGORY_PATTERN[MODULE_CONFIG.transport].fetchAllFaqCategoryForDropdown,
          { lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}