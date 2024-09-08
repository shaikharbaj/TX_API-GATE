/**
 * @fileoverview
 * Testimonial controller file to handle all the testimonial requests.
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
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { TestimonialService } from "./testimonial.service";
import { TESTIMONIAL_MODULE_PERMISSION } from "./permission";
import { AuthGuard, LangGuard, RoleGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import {
  CreateTestimonialBody,
  UpdateTestimonialBody,
  ToggleTestimonialVisibilityBody,
} from "./types";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
@Controller("testimonial")
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) { }

  /**
   * @description
   * Rest API to fetch all the Testimonials.
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.LIST)
  @UseGuards(LangGuard)
  @Get()
  async fetchAllTestimonials(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.fetchAllTestimonials(
        page_size,
        page,
        searchText,
        is_active,
        sortColumn,
        sortBy,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
 * @description
 * Rest API to fetch testimonials for customer
 */
  @UseGuards(LangGuard)
  @Get("/customer")
  async fetchTestimonials(@Lang() lang: string) {
    try {
      const response: any =
        await this.testimonialService.fetchTestimonials(lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch Testimonial by given id
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findTestimonialById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.testimonialService.findTestimonialById(
        uuid,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
    })
  )
  async createTestimonial(
    @Auth() auth: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateTestimonialBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.createTestimonial(
        auth,
        file,
        data,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
    })
  )
  async updateTestimonial(
    @Auth() auth: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateTestimonialBody,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.updateTestimonial(
        uuid,
        auth,
        file,
        data,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to delete Testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteTestimonial(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.testimonialService.deleteTestimonial(
        uuid,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update testimonial visibility i.e: active, inactive
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleTestimonialVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: ToggleTestimonialVisibilityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.testimonialService.toggleTestimonialVisibility(
          uuid,
          auth,
          body,
          lang
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
