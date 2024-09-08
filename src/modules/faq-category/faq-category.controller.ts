/**
 * @fileoverview
 * Faq controller file to handle all the faq requests.
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
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { HasPermission, Lang } from 'src/common/decorators';
import { FAQ_CATEGORY_MODULE_PERMISSION } from './permission';
import { FaqCategoryService } from './faq-category.service';


@Controller('faq-category')
export class FaqCategoryController {
  constructor(private readonly faqCategoryService: FaqCategoryService) { }

  /**
* @description
* Rest API to fetch all the faq categories in dropdown
*/
  @HasPermission(FAQ_CATEGORY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/dropdown')
  async fetchAllFaqCategoryForDropdown(@Lang() lang: string) {
    try {
      const response: any = await this.faqCategoryService.fetchAllFaqCategoryForDropdown(lang);
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
}