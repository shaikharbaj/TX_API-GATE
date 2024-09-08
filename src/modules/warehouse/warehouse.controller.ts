/**
 * @fileoverview
 * Warehouse controller file to handle all the warehouse requests.
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
  UseGuards,
} from "@nestjs/common";
import { WAREHOUSE_MODULE_PERMISSION } from "./permission";
import { AuthGuard, RoleGuard, LangGuard } from "../auth/guard";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { WarehouseService } from "./warehouse.service";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import {
  CreateWarehouseBody,
  ToggleWarehouseVisibilityBody,
  UpdateWarehouseBody,
} from "./types";

@Controller("warehouse")
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  /**
   * @description
   * Rest API to fetch all the warehouse
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllWarehouse(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.warehouseService.fetchAllWarehouse(
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
   * Rest API to fetch all the deleted warehouse
   */
  //  @HasPermission(WAREHOUSE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedWarehouse(
    @Query() { page_size, page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.warehouseService.fetchAllDeletedWarehouse(
          page_size,
          page,
          searchText,
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
   * Rest API to fetch all the warehouses in dropdown
   */
  //  @HasPermission(WAREHOUSE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllWarehouseForDropdown(@Lang() lang: string) {
    try {
      const response: any =
        await this.warehouseService.fetchAllWarehouseForDropdown(lang);
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
   * Rest API to create warehouse
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createWarehouse(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateWarehouseBody
  ) {
    try {
      const response: any = await this.warehouseService.createWarehouse(
        auth,
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
   * Rest API to update warehouse visibility i.e: active, inactive
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleWarehouseVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleWarehouseVisibilityBody
  ) {
    try {
      const response: any =
        await this.warehouseService.toggleWarehouseVisibility(
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
   * Rest API to fetch warehouse by given id
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findWarehouseById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.warehouseService.findWarehouseById(
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
   * Rest API to update warehouse
   */
  //  @HasPermission(WAREHOUSE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateWarehouse(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateWarehouseBody
  ) {
    try {
      const response: any = await this.warehouseService.updateWarehouse(
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
   * Rest API to restore warehouse
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/restore/:uuid")
  async restoreWarehouse(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.warehouseService.restoreWarehouse(
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
   * delete the record from warehouse
   * @description
   * Rest API to delete warehouse
   */
  // @HasPermission(WAREHOUSE_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteWarehouse(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.warehouseService.deleteWarehouse(
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
