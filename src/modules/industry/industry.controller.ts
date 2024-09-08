/**
 * @fileoverview
 * Industry controller file to handle all the industry requests.
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
import { INDUSTRY_MODULE_PERMISSION } from './permission';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { IndustryService } from './industry.service';
import {
  CreateIndustryBody,
  ToggleIndustryVisibilityBody,
  UpdateIndustryBody
} from './types';

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) { }

  /**
 * @description
 * Rest API to fetch all the industry
 */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllIndustry(@Query() { page_size, page, searchText, is_active, sortColumn, sortBy }: any, @Lang() lang: string) {
    try {
      const response: any = await this.industryService.fetchAllIndustry(page_size, page, searchText, is_active, sortColumn, sortBy, lang);
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
   * Rest API to fetch all the deleted industry
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedIndustry(@Query() { page_size, page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.industryService.fetchAllDeletedIndustry(page_size, page, searchText, lang);
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
* Rest API to fetch all the industrys in dropdown
*/
  @UseGuards(AuthGuard, LangGuard)
  @Get('/dropdown')
  async fetchAllIndustryForDropdown(@Lang() lang: string) {
    try {
      const response: any = await this.industryService.fetchAllIndustryForDropdown(lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
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
   * Rest API to fetch industry by given id
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findIndustryById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.industryService.findIndustryById(uuid, lang);
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
   * Rest API to create industry
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createIndustry(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateIndustryBody) {
    try {
      const response: any = await this.industryService.createIndustry(auth, lang, data);
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
   * Rest API to update industry visibility i.e: active, inactive
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleIndustryVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleIndustryVisibilityBody,
  ) {
    try {
      const response: any = await this.industryService.toggleIndustryVisibility(
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
   * Rest API to update industry
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateIndustry(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateIndustryBody,

  ) {
    try {
      const response: any = await this.industryService.updateIndustry(
        uuid,
        auth,
        lang,
        data,
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
   * Rest API to Restore deleted industry
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreIndustry(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.industryService.restoreIndustry(uuid, auth, lang);
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
   * Rest API to delete industry
   */
  @HasPermission(INDUSTRY_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteIndustry(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.industryService.deleteIndustry(uuid, auth, lang);
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
