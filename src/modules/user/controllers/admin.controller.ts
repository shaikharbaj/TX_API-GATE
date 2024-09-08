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
  Delete,
} from "@nestjs/common";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { AuthGuard, LangGuard, RoleGuard } from "src/modules/auth/guard";
import { ADMIN_MODULE_PERMISSION } from "../permission";
import { AdminService } from "../services";
import {
  CreateAdminUserBody,
  ToggleAdminUserVisibilityBody,
  UpdateAdminUserBody,
  UpdateAdminUserPasswordBody,
  UpdateBasicInfoStatusBody,
  UpdateVerificationStatusBody,
  UpdateDocumentStatusBody,
  UpdateBankingInfoStatusBody,
} from "../types";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @description
   * Rest API to fetch all the admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllAdminUser(
    @Query()
    { page_size, page, searchText, is_active, sortColumn, sortBy }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.fetchAllAdminUser(
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
   * Rest API to fetch all the deleted admin users
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedAdminUser(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.fetchAllDeletedAdminUser(
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
   * Rest API to fetch all the admin user in dropdown
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllAdminUserForDropdown(@Lang() lang: string) {
    try {
      const response: any =
        await this.adminService.fetchAllAdminUserForDropdown(lang);
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
   * Rest API to fetch admin profile
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("profile")
  async fetchAdminProfile(@Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.adminService.fetchAdminProfile(
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
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findAdminUserById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.adminService.findAdminUserById(
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
   * Rest API to create a new admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createAdminUser(
    @Auth() auth: any,
    @Body() body: CreateAdminUserBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.createAdminUser(
        auth,
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
   * Rest API to update admin user visibility i.e: active, inactive
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleAdminUserVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: ToggleAdminUserVisibilityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.toggleAdminUserVisibility(
        uuid,
        auth,
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
   * Rest API to update admin user password
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/password")
  async updateAdminUserPassword(
    @Auth() auth: any,
    @Body() data: UpdateAdminUserPasswordBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.updateAdminUserPassword(
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

  /**
   * @description
   * Rest API to update admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateAdminUser(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() data: UpdateAdminUserBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.updateAdminUser(
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

  /**
   * @description
   * Rest API to delete admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteAdminUser(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.deleteAdminUser(
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
   * Rest API to Restore deleted admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/restore/:uuid")
  async restoreAdminUser(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.restoreAdminUser(
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
   * Rest API to update onboarding basic information status
   */

  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/on-boarding/basic-info-update/:uuid")
  async updateBasicInformationStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() payload: UpdateBasicInfoStatusBody,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.adminService.updateBasicInformationStatus(
          uuid,
          auth,
          payload,
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
   * Rest API to update onboarding banking information status
   */

  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/on-boarding/banking-info-update/:uuid")
  async updateBankingInformationStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() payload: UpdateBankingInfoStatusBody,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.adminService.updateBankingInformationStatus(
          uuid,
          auth,
          payload,
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
   * Rest API to update onboarding verification status
   */

  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/on-boarding/verification-update/:uuid")
  async updateVerificationStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() payload: UpdateVerificationStatusBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.updateVerificationStatus(
        uuid,
        auth,
        payload,
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
   * Rest API to update onboarding document status
   */

  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/on-boarding/document-update/:uuid")
  async updateDocumentStatus(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() payload: UpdateDocumentStatusBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.adminService.updateDocumentStatus(
        uuid,
        auth,
        payload,
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
   * Rest API to fetch admin user basic info by id.
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("basic-information/:uuid")
  async fetchAdminUserBasicDetailsById(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.adminService.fetchAdminUserBasicDetailsById(uuid, lang);
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
