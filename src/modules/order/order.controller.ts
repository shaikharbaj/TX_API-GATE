/**
 * @fileoverview
 * Order controller file to handle all the order requests.
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
  UseGuards,
  Query,
} from "@nestjs/common";
import { ORDER_MODULE_PERMISSION } from "./permission";
import { AuthGuard, LangGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { OrderService } from "./order.service";
import {
  CreateOrderBody,
  UpdateOrderStatusBody,
  UpdateProductOrderStatusBody,
} from "./types";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) { }



  /**
   * @description
   * Rest API to fetch all the order for seller
   */
  @HasPermission(ORDER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get()
  async fetchOrderForSeller(
    @Query() { page_size, page, searchText, status, sortColumn, sortBy }: any,
    @Lang() lang: string,
    @Auth() auth: any
  ) {
    try {
      const response: any = await this.orderService.fetchOrderForSeller(
        page_size,
        page,
        searchText,
        status,
        sortColumn,
        sortBy,
        lang,
        auth
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
  * Rest API to fetch all the order for admin
  */
  @HasPermission(ORDER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("/admin")
  async fetchOrderForAdmin(
    @Query() { page_size, page, searchText, sortColumn, sortBy }: any,
    @Lang() lang: string,
    @Auth() auth: any
  ) {
    try {
      const response: any = await this.orderService.fetchOrderForAdmin(
        page_size,
        page,
        searchText,
        sortColumn,
        sortBy,
        lang,
        auth
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
   * Rest API to fetch all the order  for user
   */
  @HasPermission(ORDER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("user")
  async fetchOrderForUser(
    @Query() { page_size, page, searchText, sortColumn, sortBy }: any,
    @Lang() lang: string,
    @Auth() auth: any
  ) {
    try {
      const response: any = await this.orderService.fetchOrderForUser(
        page_size,
        page,
        searchText,
        sortColumn,
        sortBy,
        lang,
        auth
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
   * Rest API to fetch order by given id for supplier
   */
  @HasPermission(ORDER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("/seller/:uuid")
  async fetchOrderByIdForSeller(
    @Param("uuid") uuid: string,
    @Lang() lang: string,
    @Auth() auth: any
  ) {
    try {
      const response: any = await this.orderService.fetchOrderByIdForSeller(
        uuid,
        lang,
        auth
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
   * Rest API to fetch order by given id for user
   */
  @HasPermission(ORDER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("/user/:uuid")
  async fetchOrderByIdForUser(
    @Param("uuid") uuid: string,
    @Lang() lang: string,
    @Auth() auth: any
  ) {
    try {
      const response: any = await this.orderService.fetchOrderByIdForUser(
        uuid,
        lang,
        auth
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
   * Rest API to create order
   */
  @HasPermission(ORDER_MODULE_PERMISSION.ADD)
  // @UseGuards(AuthGuard, LangGuard)
  @UseGuards(AuthGuard, LangGuard)
  @Post()
  async createOrder(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateOrderBody
  ) {
    try {
      const response: any = await this.orderService.createOrder(
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
   * Rest API to update order status
   */
  @HasPermission(ORDER_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, LangGuard)
  @Patch("/status/:uuid")
  async updateOrderStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: UpdateOrderStatusBody
  ) {
    try {
      const response: any = await this.orderService.updateOrderStatus(
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
   * Rest API to update order status
   */
  @HasPermission(ORDER_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, LangGuard)
  @Patch("/product/status/:uuid")
  async updateProductOrderStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: UpdateProductOrderStatusBody
  ) {
    try {
      const response: any = await this.orderService.updateProductOrderStatus(
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
}
