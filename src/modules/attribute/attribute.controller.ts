/**
 * @fileoverview
 * Category controller file to handle all the category requests.
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
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpException,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { AuthGuard, RoleGuard, LangGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { ATTRIBUTE_MODULE_PERMISSION } from "./permission";
import {
  CreateAttributeBody,
  ToggleAttributeVisibilityBody,
  UpdateAttributeBody,
} from "./types";
import { AttributeService } from "./attribute.service";

@Controller("attribute")
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) { }

  /**
   * @description
   * Rest API to fetch all the attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllAttribute(
    @Query() { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeService.fetchAllAttribute(
        page_size, page, searchText, is_active, sortColumn, sortBy, lang
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
   * Rest API to fetch all the deleted attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedAttribute(

    @Query() { page_size, page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeService.fetchAllDeletedAttribute(
        page_size, page, searchText, lang
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
   * Rest API to fetch all the attribute in dropdown
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllAttributeForDropdown(@Lang() lang: string) {
    try {
      const response: any =
        await this.attributeService.fetchAllAttributeForDropdown(lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
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
   * Rest API to fetch attribute by given id
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("by-category/:categoryId")
  async fetchAttributeByCategory(@Param("categoryId") categoryId: string, @Lang() lang: string) {
    try {
      const response: any = await this.attributeService.fetchAttributeByCategory(
        +categoryId,
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
   * Rest API to fetch attribute by given id
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findAttributeById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.attributeService.findAttributeById(
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
   * Rest API to create attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createAttribute(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateAttributeBody
  ) {
    try {
      const response: any = await this.attributeService.createAttribute(
        auth,
        lang,
        data
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
   * Rest API to update attribute visibility i.e: active, inactive
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleAttributeVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleAttributeVisibilityBody
  ) {
    try {
      const response: any =
        await this.attributeService.toggleAttributeVisibility(
          uuid,
          auth,
          lang,
          body
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
   * Rest API to update attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateAttribute(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateAttributeBody
  ) {
    try {
      const response: any = await this.attributeService.updateAttribute(
        uuid,
        auth,
        lang,
        data
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
   * Rest API to delete attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteAttribute(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeService.deleteAttribute(
        uuid,
        auth,
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
   * Rest API to Restore deleted attribute
   */
  @HasPermission(ATTRIBUTE_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/restore/:uuid")
  async restoreAttribute(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeService.restoreAttribute(
        uuid,
        auth,
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
