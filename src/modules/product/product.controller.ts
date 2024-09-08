/**
 * @fileoverview
 * Product controller file to handle all the product requests.
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
import { AuthGuard, LangGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { PRODUCT_MODULE_PERMISSION } from "./permission";
import {
  CreateProductBasicInformationBody,
  CreateProductShippingInformationBody,
  CreateProductSeoInformationBody,
} from "./types";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /**
   * @description
   * Rest API to fetch product by sub-category slug.
   */
  @UseGuards(LangGuard)
  @Get("/fetchProductBySubCategorySlug/:slug")
  async fetchProductBySubCategorySlug(@Param('slug') slug: string,@Lang() lang: string
  ) {    
    try {
      const response: any = await this.productService.fetchProductBySubCategorySlug(slug,
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
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch product by brand slug.
   */
  @UseGuards(LangGuard)
  @Get("/fetchProductByBrandSlug/:slug")
  async fetchProductByBrandSlug(@Param('slug') slug: string,@Lang() lang: string
  ) {    
    try {
      const response: any = await this.productService.fetchProductByBrandSlug(slug,
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
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  /**
   * @description
   * Rest API to fetch all product information for shop.
   */
  @UseGuards(LangGuard)
  @Get("/shop")
  async fetchAllProductForShop(
    @Query()
    { page_size, page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.productService.fetchAllProductForShop(
        page_size,
        page,
        searchText,
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
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
 * @description
 * Rest API to fetch all product details by slug.....
 */
  @UseGuards(LangGuard)
  @Get("fetchProductBySlug/:slug")
  async fetchProductBySlug(
    @Param("slug")
    slug: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.productService.fetchProductBySlug(
        slug,
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
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
 * @description
 * Rest API to fetch product attribute by product id.....
 */
  @UseGuards(LangGuard)
  @Get("fetchProductAttributesById/:parentId")
  async fetchProductAttributesById(
    @Param("parentId")
    parentId: number,
    @Lang() lang: string
  ) {
    try { 
      const response: any = await this.productService.fetchProductAttributesById(
        parentId,
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
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch all the products
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get()
  async fetchAllProduct(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.productService.fetchAllProduct(
        page_size,
        page,
        searchText,
        is_active,
        sortColumn,
        sortBy,
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
   * Rest API to fetch product basic information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, LangGuard)
  @Get("basic-information/:uuid")
  async fetchProductBasicInformation(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.productService.fetchProductBasicInformation(
          auth,
          lang,
          uuid
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product basic information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Post("basic-information")
  async createProductBasicInformation(
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateProductBasicInformationBody
  ) {
    try {
      const response: any =
        await this.productService.createProductBasicInformation(
          auth,
          lang,
          data
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product variants
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Get("variants/:uuid")
  async fetchProductVariants(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.productService.fetchProductVariants(
        auth,
        lang,
        uuid
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product variants
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Post("variants/:uuid")
  async createProductVariants(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: any
  ) {
    try {
      const response: any = await this.productService.createProductVariants(
        auth,
        lang,
        uuid,
        data
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch product locations
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Get("locations/:uuid")
  async fetchProductLocations(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.productService.fetchProductLocations(
        auth,
        lang,
        uuid
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product locations
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Post("locations/:uuid")
  async createProductLocations(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: any
  ) {
    try {
      const response: any = await this.productService.createProductLocations(
        auth,
        lang,
        uuid,
        data
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch product shipping information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Get("shipping/:uuid")
  async fetchProductShippingInformation(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.productService.fetchProductShippingInformation(
          auth,
          lang,
          uuid
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product shipping information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Post("shipping/:uuid")
  async createProductShippingInformation(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateProductShippingInformationBody
  ) {
    try {
      const response: any =
        await this.productService.createProductShippingInformation(
          auth,
          lang,
          uuid,
          data
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch product seo information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Get("seo/:uuid")
  async fetchProductSeoInformation(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.productService.fetchProductSeoInformation(auth, lang, uuid);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create product seo information
   */
  @HasPermission(PRODUCT_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, LangGuard)
  @Post("seo/:uuid")
  async createProductSeoInformation(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: CreateProductSeoInformationBody
  ) {
    try {
      const response: any =
        await this.productService.createProductSeoInformation(
          auth,
          lang,
          uuid,
          data
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      throw new HttpException(
        err?.message ? err.message : err,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
