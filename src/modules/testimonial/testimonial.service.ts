/**
 * @fileoverview
 * Testimonial service file to handle all related functionality.
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
import { MODULE_CONFIG } from "./module.config";
import {
  CreateTestimonialBody,
  ToggleTestimonialVisibilityBody,
} from "./types";
import { lastValueFrom } from "rxjs";
import { CMS_MS_TESTIMONIAL_PATTERN } from "./pattern";

@Injectable()
export class TestimonialService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("CMS_MICROSERVICE")
    private readonly cmsClient: ClientKafka | ClientProxy | any
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      if (MODULE_CONFIG.transport === "KAFKA") {
        this.cmsClient.subscribeToResponseOf("fetchTestimonials");
        this.cmsClient.subscribeToResponseOf("fetchAllTestimonial");
        this.cmsClient.subscribeToResponseOf("findTestimonialById");
        this.cmsClient.subscribeToResponseOf("createTestimonial");
        this.cmsClient.subscribeToResponseOf("updateTestimonial");
        this.cmsClient.subscribeToResponseOf("deleteTestimonial");
        this.cmsClient.subscribeToResponseOf("toggleTestimonialVisibility");
        this.cmsClient.connect();
      }
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.cmsClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the Testimonials
   */
  async fetchAllTestimonials(
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
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport]
            .fetchAllTestimonial,
          { page_size, page, searchText, is_active, sortColumn, sortBy, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch Testimonial by given id
   */
  async findTestimonialById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport]
            .findTestimonialById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create testimonial
   */
  async createTestimonial(
    auth: any,
    file: any,
    data: CreateTestimonialBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport].createTestimonial,
          { auth, file, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update testimonial
   */
  async updateTestimonial(uuid: string, auth: any, file: any, payload: any, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport].updateTestimonial,
          { uuid: uuid, auth, file, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete testimonial
   */
  async deleteTestimonial(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport].deleteTestimonial,
          { uuid: uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update testimonial visibility i.e: active, inactive
   */
  async toggleTestimonialVisibility(
    uuid: string,
    auth: any,
    payload: ToggleTestimonialVisibilityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport]
            .toggleTestimonialVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch testimonials for customer
   */
  async fetchTestimonials(lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_TESTIMONIAL_PATTERN[MODULE_CONFIG.transport]
            .fetchTestimonials,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
