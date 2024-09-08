/**
 * @fileoverview
 * ProductRating controller file to handle all the ProductRating requests.
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
} from '@nestjs/common';
import { PRODUCT_RATING_MODULE_PERMISSION } from './permission';
import { AuthGuard, RoleGuard, LangGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { ProductRatingService } from './product-rating.service';
import {
  CreateProductRatingBody,
  ToggleProductRatingVisibilityBody,
} from './types';

@Controller('product-rating')
export class ProductRatingController {
  constructor(private readonly ProductRatingService: ProductRatingService) { }

  /**
 * @description
 * Rest API to fetch all the ProductRating
 */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllProductRating(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.ProductRatingService.fetchAllProductRating(page, searchText, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to fetch all the deleted ProductRating
   */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedProductRating(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.ProductRatingService.fetchAllDeletedProductRating(page, searchText, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  /**
   * @description
   * Rest API to fetch ProductRating by given id
   */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findProductRatingById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.ProductRatingService.findProductRatingById(uuid, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to create Product Rating
   */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createProductRating(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateProductRatingBody) {
    try {
      const response: any = await this.ProductRatingService.createProductRating(auth, lang, data);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {

      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to update ProductRating visibility i.e: active, inactive
   */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleProductRatingVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleProductRatingVisibilityBody,
  ) {
    try {
      const response: any = await this.ProductRatingService.toggleProductRatingVisibility(
        uuid,
        auth,
        lang,
        body,
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to delete ProductRating
   */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteProductRating(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.ProductRatingService.deleteProductRating(uuid, auth, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
 * @description
 * Rest API to Restore deleted ProductRating
 */
  @HasPermission(PRODUCT_RATING_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreProductRating(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.ProductRatingService.restoreProductRating(uuid, auth, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



}
