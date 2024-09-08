
/**
 * @fileoverview
 * Attribute value controller file to handle all the attribute value requests.
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
import { ATTRIBUTE_VALUE_MODULE_PERMISSION } from "./permission";
import {
  CreateAttributeValueBody,
  ToggleAttributeValueVisibilityBody,
  UpdateAttributeValueBody,
} from "./types";
import { AttributeValueService } from "./attribute-value.service";

@Controller("attribute-value")
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) { }

  /**
   * @description
   * Rest API to fetch all the attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllAttributeValue(@Query() { page_size, page, searchText, is_active, sortColumn, sortBy }: any, @Lang() lang: string) {
    try {
      const response: any = await this.attributeValueService.fetchAllAttributeValue(
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
   * Rest API to fetch all the deleted attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedAttributeValue(
    @Query() { page_size, page, searchText }: any, @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.attributeValueService.fetchAllDeletedAttributeValue(
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
   * Rest API to fetch all the attribute value in dropdown
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllAttributeValueForDropdown(@Lang() lang: string) {
    try {
      const response: any =
        await this.attributeValueService.fetchAllAttributeValueForDropdown(lang);
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
   * Rest API to fetch attribute value by given id
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findAttributeValueById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeValueService.findAttributeValueById(
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
   * Rest API to create attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createAttributeValue(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateAttributeValueBody
  ) {
    try {
      const response: any = await this.attributeValueService.createAttributeValue(
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
   * Rest API to update attribute value visibility i.e: active, inactive
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleAttributeValueVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleAttributeValueVisibilityBody
  ) {
    try {
      const response: any =
        await this.attributeValueService.toggleAttributeValueVisibility(
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
   * Rest API to update attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateAttributeValue(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateAttributeValueBody
  ) {
    try {
      const response: any = await this.attributeValueService.updateAttributeValue(
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
   * Rest API to delete attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteAttributeValue(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeValueService.deleteAttributeValue(
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
   * Rest API to Restore deleted attribute value
   */
  @HasPermission(ATTRIBUTE_VALUE_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/restore/:uuid")
  async restoreAttributeValue(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.attributeValueService.restoreAttributeValue(
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