/**
 * @fileoverview
 * Uom controller file to handle all the uom requests.
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
import { UOM_MODULE_PERMISSION } from "./permission";
import { AuthGuard, RoleGuard, LangGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { UomService } from "./uom.service";
import { CreateUomBody, ToggleUomVisibilityBody, UpdateUomBody } from "./types";

@Controller("uom")
export class UomController {
  constructor(private readonly uomService: UomService) {}

  /**
   * @description
   * Rest API to fetch all the uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllUom(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.uomService.fetchAllUom(
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
   * Rest API to fetch all the deleted uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedUom(
    @Query() { page_size, page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.uomService.fetchAllDeletedUom(
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
   * Rest API to fetch all the uoms in dropdown
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllUomForDropdown(@Lang() lang: string) {
    try {
      const response: any = await this.uomService.fetchAllUomForDropdown(lang);
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
   * Rest API to fetch all the rounding rule
   */
  @HasPermission(UOM_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/roundrule")
  async fetchAllRoundRule(@Lang() lang: string) {
    try {
      const response: any = await this.uomService.fetchRoundRule(lang);
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
   * Rest API to fetch all the rounding value
   */
  @HasPermission(UOM_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/roundvalue")
  async fetchAllRoundValue(@Lang() lang: string) {
    try {
      const response: any = await this.uomService.fetchRoundValue(lang);
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
   * Rest API to fetch uom by given id
   */
  @HasPermission(UOM_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findUomById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.uomService.findUomById(uuid, lang);
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
   * Rest API to create uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createUom(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateUomBody
  ) {
    try {
      const response: any = await this.uomService.createUom(auth, lang, data);
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
   * Rest API to update uom visibility i.e: active, inactive
   */
  @HasPermission(UOM_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleUomVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleUomVisibilityBody
  ) {
    try {
      const response: any = await this.uomService.toggleUomVisibility(
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
   * Rest API to update uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateUom(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateUomBody
  ) {
    try {
      const response: any = await this.uomService.updateUom(
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
   * Rest API to Restore deleted uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/restore/:uuid")
  async restoreUom(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.uomService.restoreUom(uuid, auth, lang);
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
   * Rest API to delete uom
   */
  @HasPermission(UOM_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteUom(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.uomService.deleteUom(uuid, auth, lang);
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
   * Rest API to fetch uom by id in dropdown
   */
    @UseGuards(AuthGuard, LangGuard)
    @Get("/dropdownById/:id")
    async fetchUomByIdForDropdown(
      @Param("id") id: number,
      @Lang() lang: string
    ) {
      try {
        const response: any = await this.uomService.fetchUomByIdForDropdown(
          id,
          lang
        );
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
}
