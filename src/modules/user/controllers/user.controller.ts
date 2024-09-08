import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  HttpCode,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UserService } from "../services";
import { AuthGuard, LangGuard, RoleGuard } from "src/modules/auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { BUYER_MODULE_PERMISSION } from "../permission";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description
   * Rest API to fetch all the buyers/customers
   */
  @HasPermission(BUYER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllBuyers(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.userService.fetchAllBuyers(
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
   * Rest API to fetch buyer profile
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("profile")
  async fetchBuyerProfile(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.userService.fetchBuyerProfile(
        auth,
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
   * Rest API to fetch admin user by given uuid
   */
  @UseGuards(LangGuard)
  @Get("password")
  async findUserByResetToken(@Query() { token }: any, @Lang() lang: string) {
    try {
      const response: any = await this.userService.fetchUserByResetToken(
        token,
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
   * Rest API to fetch buyer basic info.......
   */
  @UseGuards(LangGuard)
  @Get("basic-information/:uuid")
  async fetchBuyerBasicDetailsById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.userService.fetchBuyerBasicDetailsById(
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
}
