/**
 * @fileoverview
 * Seller controller file to handle all the seller requests.
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
  Body,
  UseInterceptors,
  HttpStatus,
  HttpException,
  UseGuards,
  UploadedFile,
  Query,
  UploadedFiles,
  Param,
} from "@nestjs/common";
import { SellerService } from "../services";
import { AuthGuard, LangGuard, RoleGuard } from "src/modules/auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import {
  SellerBankDetailBody,
  SellerBasicDetailBody,
  SellerDocumentsBody,
  SellerVerificationBody,
} from "../types";
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import * as multer from "multer";
import { SELLER_MODULE_PERMISSION } from "../permission";

@Controller("seller")
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  /**
   * @description
   * Rest API to fetch all the seller
   */
  @HasPermission(SELLER_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllSeller(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.fetchAllSeller(
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
   * Rest API to fetch seller profile
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("profile")
  async fetchSellerProfile(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.sellerService.fetchSellerProfile(
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
   * Rest API to fetch basic details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/onboarding/basic-details")
  async fetchBasicDetails(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.sellerService.fetchBasicDetails(
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
   * Rest API to create onboarding basic details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post("/onboarding/basic-details")
  async createUpdateBasicDetails(
    @Auth() auth: any,
    @Body() body: SellerBasicDetailBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.createUpdateBasicDetails(
        auth,
        body,
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
   * Rest API to fetch bank details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/onboarding/bank-details")
  async fetchBankDetails(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.sellerService.fetchBankDetails(
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
   * Rest API to create onboarding bank details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post("/onboarding/bank-details")
  async createUpdateBankDetails(
    @Auth() auth: any,
    @Body() body: SellerBankDetailBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.createUpdateBankDetails(
        auth,
        body,
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
   * Rest API to fetch verification details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/onboarding/verification")
  async fetchVerificationDetails(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.sellerService.fetchVerificationDetails(
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
   * Rest API to create onboarding verification details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post("/onboarding/verification")
  @UseInterceptors(
    FileInterceptor("files", {
      storage: multer.memoryStorage(),
    })
  )
  async createUpdateVerification(
    @Auth() auth: any,
    @UploadedFile() files: Express.Multer.File,
    @Body() body: SellerVerificationBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.createUpdateVerification(
        auth,
        files,
        body,
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
   * Rest API to fetch document details
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/onboarding/documents")
  async fetchDocumentsDetails(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.sellerService.fetchDocumentsDetails(
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
   * Rest API to create onboarding documents
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post("/onboarding/documents")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "chequeFile", maxCount: 1 },
        { name: "gstFile", maxCount: 1 },
        { name: "signatureFile", maxCount: 1 },
        { name: "personalFile", maxCount: 1 },
      ],
      {
        storage: multer.memoryStorage(),
      }
    )
  )
  async createUpdateDocuments(
    @Auth() auth: any,
    @UploadedFiles()
    files: {
      chequeFile?: Express.Multer.File;
      gstFile?: Express.Multer.File;
      signatureFile?: Express.Multer.File;
      personalFile?: Express.Multer.File;
    },
    @Body() body: SellerDocumentsBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.createUpdateDocuments(
        auth,
        files,
        body,
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
   * Rest API to fetch seller basic info.......
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("basic-information/:uuid")
  async fetchSellerBasicDetailsById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.sellerService.fetchSellerBasicDetailsById(uuid, lang);
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
   * Rest API to fetch seller bank details by id.......
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("bank-details/:uuid")
  async fetchSellerBankDetailsById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.sellerService.fetchSellerBankDetailsById(
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
   * Rest API to fetch seller verification by id.......
   */
    @UseGuards(AuthGuard, LangGuard)
    @Get("verification/:uuid")
    async fetchSellerVerificationById(
      @Param("uuid") uuid: string,
      @Lang() lang: string
    ) {
      try {
        const response: any = await this.sellerService.fetchSellerVerificationById(
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
    * Rest API to fetch seller documents by id.......
    */
     @UseGuards(AuthGuard, LangGuard)
     @Get("document/:uuid")
     async fetchSellerDocumentsById(
       @Param("uuid") uuid: string,
       @Lang() lang: string
     ) {
       try {
         const response: any = await this.sellerService.fetchSellerDocumentsById(
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
