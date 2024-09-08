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
} from "@nestjs/common";
import { AdminLoginBody, RegisterSellerBody, BuyerLoginBody, SellerLoginBody, RegisterBuyerBody, ForgotPasswordBody, ResetPasswordBody } from "./types";
import { AuthService } from "./auth.service";
import { LangGuard } from "./guard";
import { Lang } from "src/common/decorators";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * @description
   * Rest API to authenticate admin
   */
  @UseGuards(LangGuard)
  @Post("admin/login")
  async adminLogin(@Body() body: AdminLoginBody, @Lang() lang: string) {
    try {
      const response: any = await this.authService.adminLogin(body, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * @description
  * Rest API to authenticate seller
  */
  @UseGuards(LangGuard)
  @Post("/seller/login")
  async sellerLogin(@Body() body: SellerLoginBody, @Lang() lang: string) {
    try {
      const response: any = await this.authService.sellerLogin(body, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(err.message, err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description
   * Rest API to register seller
   */
  @UseGuards(LangGuard)
  @Post("/seller/register")
  async sellerRegistration(
    @Body() body: RegisterSellerBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.authService.sellerRegistration(
        body,
        lang
      );
      return {
        statusCode: HttpStatus.CREATED,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /**
   * @description
   * Rest API to authenticate Buyer
   */
  @UseGuards(LangGuard)
  @Post("buyer/login")
  async buyerLogin(@Body() body: BuyerLoginBody, @Lang() lang: string) {
    try {
      const response: any = await this.authService.buyerLogin(body, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description
   * Rest API to create a new buyer.
   */
  @UseGuards(LangGuard)
  @Post("buyer/register")
  async buyerRegistration(
    @Body() body: RegisterBuyerBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.authService.buyerRegistration(
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
  * Rest API to forgot password.
  */
  @UseGuards(LangGuard)
  @Post("/forgot-password")
  async forgotPassword(
    @Body() body: ForgotPasswordBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.authService.forgotPassword(
        body,
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
* Rest API to reset password.
*/
  @UseGuards(LangGuard)
  @Patch("/reset-password")
  async resetPassword(
    @Body() body: ResetPasswordBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.authService.resetPassword(
        body,
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

