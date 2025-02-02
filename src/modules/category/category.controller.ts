/**
 * @fileoverview
 * Category controller file to handle all the category requests.
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
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard, RoleGuard, LangGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { CATEGORY_MODULE_PERMISSION } from './permission';
import { CreateCategoryBody, ToggleCategoryVisibilityBody, UpdateCategoryBody } from './types';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from "multer";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    /**
   * @description
   * Rest API to fetch all the category
   */
    @HasPermission(CATEGORY_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get()
    async fetchAllCategory(@Query() { page_size, page, searchText, is_active, sortColumn, sortBy }: any, @Lang() lang: string,) {
        try {
            const response: any = await this.categoryService.fetchAllCategory(page_size, page, searchText, is_active, sortColumn, sortBy, lang);
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
     * Rest API to fetch all the deleted category
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get('/deleted')
    async fetchAllDeletedCategory(@Query() { page, searchText }: any, @Lang() lang: string,) {
        try {
            const response: any = await this.categoryService.fetchAllDeletedCategory(page, searchText, lang);
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
  * Rest API to fetch all the category in dropdown
  */
    @UseGuards(AuthGuard, LangGuard)
    @Get('/dropdown')
    async fetchAllCategoryForDropdown(@Lang() lang: string) {
        try {
            const response: any = await this.categoryService.fetchAllCategoryForDropdown(lang);
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
  * Rest API to fetch category by id in dropdown
  */
    @UseGuards(AuthGuard, LangGuard)
    @Get('/dropdownById/:id')
    async fetchCategoryByIdForDropdown(@Param('id') id: number, @Lang() lang: string) {
        try {
            const response: any = await this.categoryService.fetchCategoryByIdForDropdown(id, lang);
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
     * Rest API to fetch category by given id
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get(':uuid')
    async findCategoryById(@Param('uuid') uuid: string, @Lang() lang: string) {
        try {
            const response: any = await this.categoryService.findCategoryById(uuid, lang);
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
     * Rest API to create category
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.ADD)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor("file", {
            storage: multer.memoryStorage(),
        })
    )
    async createCategory(@Auth() auth: any, @UploadedFile() file: Express.Multer.File, @Lang() lang: string, @Body() data: CreateCategoryBody) {
        try {
            const response: any = await this.categoryService.createCategory(auth, file, lang, data);
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
     * Rest API to update category visibility i.e: active, inactive
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.UPDATE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch('toggle/visibility/:uuid')
    async toggleCategoryVisibility(
        @Param('uuid') uuid: string,
        @Auth() auth: any,
        @Lang() lang: string,
        @Body() body: ToggleCategoryVisibilityBody,
    ) {
        try {
            const response: any = await this.categoryService.toggleCategoryVisibility(
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
     * Rest API to update category
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.UPDATE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch(':uuid')
    @UseInterceptors(
        FileInterceptor("file", {
            storage: multer.memoryStorage(),
        })
    )
    async updateCategory(
        @Param('uuid') uuid: string,
        @Auth() auth: any,
        @UploadedFile() file: Express.Multer.File,
        @Lang() lang: string,
        @Body() data: UpdateCategoryBody,
    ) {
        try {
            const response: any = await this.categoryService.updateCategory(
                uuid,
                auth,
                file,
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
     * Rest API to Restore deleted category
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.RESTORE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch('/restore/:uuid')
    async restoreCategory(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
        try {
            const response: any = await this.categoryService.restoreCategory(uuid, auth, lang);
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
     * Rest API to delete category
     */
    @HasPermission(CATEGORY_MODULE_PERMISSION.DELETE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Delete(':uuid')
    async deleteCategory(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
        try {
            const response: any = await this.categoryService.deleteCategory(uuid, auth, lang);
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
  * Rest API to fetch category by slug
  */
    @UseGuards(LangGuard)
    @Get('/fetchCategoryBySlug/:slug')
    async fetchCategoryBySlug(@Param('slug') slug: string, @Lang() lang: string) {
        try {
            const response: any = await this.categoryService.fetchCategoryBySlug(slug, lang);
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
     * Rest API to fetch product category for supplier dropdown
     */
     @UseGuards(AuthGuard, RoleGuard, LangGuard)
     @Get('/dropdown/seller')
     async fetchProductCategorySellerDropdown(@Auth() auth: any, @Lang() lang: string) {
         try {
             const response: any = await this.categoryService.fetchProductCategorySellerDropdown(auth,lang);
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


}
