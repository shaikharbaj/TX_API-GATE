/**
 * @fileoverview
 * Wishlist controller file to handle all the wishlist requests.
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
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, LangGuard, RoleGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { WishlistService } from "./wishlist.service";
import { AddToWishListBody } from "./types";
import { WISHLIST_MODULE_PERMISSION } from "./permission";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  /**
   * @description
   * Rest API to fetch all the product from wishlist
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get()
  async fetchAllWishList(
    @Query() { page, searchText }: any,
    @Lang() lang: string,
    @Auth() auth:any
  ) {
    try {
      const response: any = await this.wishlistService.fetchWishList(
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
   * Rest API to add product to wishlist
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post()
  async AddToWishList(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: AddToWishListBody
  ) {
    try {
      const response: any = await this.wishlistService.AddToWishlist(
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
   * Rest API to delete the product from wishlist
   */
  @UseGuards(AuthGuard, LangGuard)
  @Delete(":uuid")
  async removeFromWishList(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.wishlistService.removeFromWishList(
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
