export const AUTH_MS_PATTERN = {
  TCP: {
    veriryAccessToken: {
      role: "veriryAccessToken",
      cmd: "verify-access-token",
    },
    veriryPermission: {
      role: "veriryPermission",
      cmd: "verify-permission",
    },
    adminLogin: { role: "adminLogin", cmd: "admin-login" },
    sellerRegistration: {
      role: "sellerRegistration",
      cmd: "seller-registration",
    },
    buyerRegistration: {
      role: "buyerRegistration",
      cmd: "buyer-registration",
    },
    sellerLogin: { role: "sellerLogin", cmd: "seller-login" },
    buyerLogin: { role: "buyerLogin", cmd: "buyer_login" },
    forgotPassword: {
      role: "forgotPassword",
      cmd: 'forgot-password'
    },
    resetPassword: {
      role: 'resetPassword',
      cmd: 'reset-password'
    },
  },
  KAFKA: {
    veriryAccessToken: "veriryAccessToken",
    veriryPermission: "veriryPermission",
    adminLogin: "adminLogin",
    sellerRegistration: "sellerRegistration",
    buyerLogin: "buyerLogin",
    buyerRegistration: "buyerRegistration",
    sellerLogin: 'sellerLogin',
    forgotPassword: "forgotPassword",
    resetPassword: "resetPassword",
  },
  REDIS: {},
  RABBITMQ: {},
};
