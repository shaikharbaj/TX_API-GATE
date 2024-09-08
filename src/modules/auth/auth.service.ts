/**
 * @fileoverview
 * Auth service file to handle all authentication functionality.
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
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  NotFoundException,
} from "@nestjs/common";
import { ClientKafka, ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "./module.config";
import { AUTH_MS_PATTERN } from "./pattern";
import {
  AdminLoginBody,
  BuyerLoginBody,
  ForgotPasswordBody,
  RegisterBuyerBody,
  RegisterSellerBody,
  ResetPasswordBody,
  SellerLoginBody,
} from "./types";

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("AUTH_MICROSERVICE")
    private readonly authClient: ClientKafka | ClientProxy | any
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.authClient.subscribeToResponseOf("veriryAccessToken");
      this.authClient.subscribeToResponseOf("veriryPermission");
      this.authClient.subscribeToResponseOf("adminLogin");
      this.authClient.subscribeToResponseOf("buyerLogin");
      this.authClient.subscribeToResponseOf("buyerRegistration");
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.authClient.close();
    }
  }

  /**
   * @description
   * This API is use to verify the token which had generated during logn and return the response with status code
   */
  async verifyToken(token: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].veriryAccessToken,
          { data: token }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * This API is use to verify the permission
   */
  async verifyPermission(auth: any, permission: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].veriryPermission,
          {
            data: {
              auth,
              permission,
            },
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Login API to authenticate the admin and return the response with status code
   */
  async adminLogin(payload: AdminLoginBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].adminLogin,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to register seller
   */
  async sellerRegistration(payload: RegisterSellerBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].sellerRegistration,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to register buyer
   */
  async buyerRegistration(body: RegisterBuyerBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].buyerRegistration,
          { data: body, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Login API to authenticate the buyer and return the response with status code
   */
  async buyerLogin(payload: BuyerLoginBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].buyerLogin,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Login API to authenticate the seller and return the response with status code
   */
  async sellerLogin(payload: SellerLoginBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].sellerLogin,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to forgot password
 */
  async forgotPassword(payload: ForgotPasswordBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].forgotPassword,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to reset password
 */
  async resetPassword(payload: ResetPasswordBody, lang: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].resetPassword,
          { data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
