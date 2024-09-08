/**
 * @fileoverview
 * Cart controller file to handle all the cart requests.
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
import { AuthGuard, LangGuard } from "../auth/guard";
import { Auth, Lang } from "src/common/decorators";
import { addProductToCartBody } from "./types";
import { CartService } from "./cart.service";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * @description
   * Rest API to fetch all the product from cart
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get()
  async fetchCartProduct(@Query() { page, searchText }: any, @Lang() lang: string,@Auth() auth:any) {
    try {
      const response: any = await this.cartService.fetchCartProduct(
        page,
        searchText,
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
   * Rest API to add product to cart
   */
  @UseGuards(AuthGuard,LangGuard)
  @Post()
  async addProductToCart(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: addProductToCartBody
  ) {
    try {
      const response: any = await this.cartService.addProductToCart(auth, lang, data);
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
   * Rest API to delete the product from cart.
   */
  @UseGuards(AuthGuard, LangGuard)
  @Delete(":uuid")
  async removeProductFromCart(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cartService.removeProductFromCart(
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
   * Rest API to update cart
   */
  @UseGuards(AuthGuard, LangGuard)
  @Patch(":uuid")
  async updateCart(
    @Auth() auth: any,
    @Body() data: any,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cartService.updateCart(
        uuid,
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
}
