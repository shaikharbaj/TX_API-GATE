/**
 * @fileoverview
 * Global setting controller file to handle all the global setting requests.
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
  HttpStatus,
  HttpException,
  Param,
  Body,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { GLOBAL_SETTING_MODULE_PERMISSION } from './permission';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { GlobalSettingService } from './global-setting.service';
import {
  UpdateGlobalSettingBody,
} from './types';

@Controller('global-setting')
export class GlobalSettingController {
  constructor(private readonly globalSettingService: GlobalSettingService) { }

  /**
 * @description
 * Rest API to fetch all the global setting
 */
  @HasPermission(GLOBAL_SETTING_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllGlobalSetting(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.globalSettingService.fetchAllGlobalSetting(page, searchText, lang);
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
   * Rest API to update global setting
   */
  @HasPermission(GLOBAL_SETTING_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch()
  async updateGlobalSetting(@Auth() auth: any, @Lang() lang: string, @Body() data: UpdateGlobalSettingBody) {
    try {
      const response: any = await this.globalSettingService.updateGlobalSetting(auth, lang, data);
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
   * Rest API to delete global setting
   */
  @HasPermission(GLOBAL_SETTING_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteGlobalSetting(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.globalSettingService.deleteGlobalSetting(uuid, lang);
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
