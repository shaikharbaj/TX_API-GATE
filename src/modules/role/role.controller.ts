/**
 * @fileoverview
 * Role controller file to handle all the roles requests.
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
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/guard/auth.guard";
import { Auth } from "src/common/decorators/auth.decorator";
import { CreateRoleBody } from "./types";
import { RoleService } from "./role.service";
import { LangGuard } from "../auth/guard";
import { Lang } from "src/common/decorators";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * @description
   * Rest API to fetch all the roles
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get()
  async fetchAllRole(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.roleService.fetchAllRole(
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch deleted roles
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("deleted")
  async fetchAllRolesDeleted(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.fetchAllRolesDeleted(
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch all the roles in dropdown
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllRoleForDropdown(@Lang() lang: string) {
    try {
      const response: any =
        await this.roleService.fetchAllRoleForDropdown(lang);
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
   * Rest API to fetch roles Meta Obj
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("meta")
  async fetchAllRolesMeta(@Lang() lang: string) {
    try {
      const response: any = await this.roleService.fetchAllRolesMeta(lang);
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
   * Rest API to fetch permissions of requested roles
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get("/permissions")
  async fetchRolesPermissions(@Query() { role_id }: any, @Lang() lang: string) {
    try {
      const response: any = await this.roleService.fetchRolesPermissions(
        role_id,
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch role by given id
   */
  @UseGuards(AuthGuard, LangGuard)
  @Get(":uuid")
  async findRoleById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.roleService.findRoleById(uuid, lang);
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
   * Rest API to create role
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post()
  async createRole(
    @Auth() auth: any,
    @Body() body: CreateRoleBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.createRole(auth, body, lang);
      return {
        statusCode: HttpStatus.CREATED,
        status: response?.status,
        message: response?.message,
        data: response?.data,
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
   * Rest API to update role visibility i.e: active, inactive
   */
  @UseGuards(AuthGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleRoleVisibility(
    @Param("uuid") uuid: string,
    @Body() body: any,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.toggleRoleVisibility(
        uuid,
        body,
        auth,
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update role
   */
  @UseGuards(AuthGuard, LangGuard)
  @Patch(":uuid")
  async updateRole(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.updateRole(
        uuid,
        auth,
        body,
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to delete role
   */
  @UseGuards(AuthGuard, LangGuard)
  @Delete(":uuid")
  async deleteRole(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.deleteRole(uuid, auth, lang);
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
   * Rest API to restore role by given id
   */
  @UseGuards(AuthGuard, LangGuard)
  @Patch("restore/:uuid")
  async restoreRoleById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.roleService.restoreRoleById(uuid, lang);
      return {
        statusCode: HttpStatus.CREATED,
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
   * Rest API to attach permissions
   */
  @UseGuards(AuthGuard, LangGuard)
  @Post("attach/permissions")
  async attachPermissionsToRole(
    @Auth() auth: any,
    @Body() body: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.roleService.attachPermissionsToRole(
        auth,
        body,
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
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
