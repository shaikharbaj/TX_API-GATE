import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  UseGuards,
  Query,
  Param,
} from "@nestjs/common";
import { FinancierService } from "../services/finacier.service";
import { AuthGuard, LangGuard, RoleGuard } from "src/modules/auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { FINANCIER_MODULE_PERMISSION } from "../permission";

@Controller("financier")
export class FinancierController {
  constructor(private readonly financierService: FinancierService) {}

  /**
   * @description
   * Rest API to fetch all the financier
   */
  @HasPermission(FINANCIER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllFinanciers(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.financierService.fetchAllFinanciers(
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
   * Rest API to fetch FINANCIER basic info by id.......
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("basic-information/:uuid")
  async fetchFinancierBasicDetailsById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.financierService.fetchFinancierBasicDetailsById(uuid, lang);
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

  
}
