export const USER_MS_ADMIN_PATTERN = {
  TCP: {
    fetchAllAdminUser: {
      role: "fetchAllAdminUser",
      cmd: "fetch-all-admin-user",
    },
    fetchAllDeletedAdminUser: {
      role: "fetchAllDeletedAdminUser",
      cmd: "fetch-all-deleted-admin-user",
    },
    fetchAllAdminUserForDropdown: {
      role: "fetchAllAdminUserForDropdown",
      cmd: "fetch-all-admin-user-for-dropdown",
    },
    findAdminUserById: {
      role: "findAdminUserById",
      cmd: "find-admin-user-by-id",
    },
    findAdminUserProfile: {
      role: "findAdminUserProfile",
      cmd: "find-admin-user-profile",
    },
    createAdminUser: { role: "createAdminUser", cmd: "create-admin-user" },
    toggleAdminUserVisibility: {
      role: "toggleAdminUserVisibility",
      cmd: "toggle-admin-user-visibility",
    },
    updateAdminUser: { role: "updateAdminUser", cmd: "update-admin-user" },
    updateAdminUserPassword: {
      role: "updateAdminUserPassword",
      cmd: "update-admin-user-password",
    },
    deleteAdminUser: { role: "deleteAdminUser", cmd: "delete-admin-user" },
    restoreAdminUser: { role: "restoreAdminUser", cmd: "restore-admin-user" },
    updateBasicInformationStatus: {
      role: "updateBasicInformationStatus",
      cmd: "update-basic-information-status",
    },
    updateBankingInformationStatus: {
      role: "updateBankingInformationStatus",
      cmd: "update-banking-information-status",
    },
    updateVerificationStatus: {
      role: "updateVerificationStatus",
      cmd: "update-verification-status",
    },
    updateDocumentStatus: {
      role: "updateDocumentStatus",
      cmd: "update-document-status",
    },
    fetchAdminUserBasicDetailsById: {
      role: "fetchAdminUserBasicDetailsById",
      cmd: "fetch-admin-user-basic-details",
    },
  },
  KAFKA: {
    fetchAllAdminUser: "fetchAllAdminUser",
    fetchAllDeletedAdminUser: "fetchAllDeletedAdminUser",
    fetchAllAdminUserForDropdown: "fetchAllAdminUserForDropdown",
    findAdminUserById: "findAdminUserById",
    findAdminUserProfile: "findAdminUserProfile",
    createAdminUser: "createAdminUser",
    toggleAdminUserVisibility: "toggleAdminUserVisibility",
    updateAdminUser: "updateAdminUser",
    updateAdminUserPassword: "updateAdminUserPassword",
    deleteAdminUser: "deleteAdminUser",
    restoreAdminUser: "restoreAdminUser",
    updateBasicInformationStatus: "updateBasicInformationStatus",
    updateBankingInformationStatus: "updateBankingInformationStatus",
    updateDocumentStatus: "updateDocumentStatus",
    fetchAdminUserBasicDetailsById: "fetchAdminUserBasicDetailsById",
  },
  REDIS: {},
  RABBITMQ: {},
};

export const USER_MS_PATTERN = {
  TCP: {
    fetchAllBuyers: { role: "fetchAllBuyers", cmd: "fetch-all-buyers" },
    fetchUserByResetToken: {
      role: "fetchUserByResetToken",
      cmd: "fetch-user-by-reset-token",
    },
    fetchUsersBasicDetailsId: {
      role: "fetchUsersBasicDetailsId",
      cmd: "fetch-users-basic-details-by-id",
    },
  },
  KAFKA: {
    fetchAllBuyers: "fetchAllBuyers",
    fetchUserByResetToken: "fetchUserByResetToken",
    fetchUsersBasicDetailsId: "fetchUsersBasicDetailsId",
  },
  REDIS: {},
  RABBITMQ: {},
};

export const USER_MS_SELLER_PATTERN = {
  TCP: {
    fetchAllSeller: { role: "fetchAllSeller", cmd: "fetch-all-seller" },
    fetchSellerProfile: {
      role: "fetchSellerProfile",
      cmd: "fetch-seller-profile",
    },
    fetchBasicDetails: {
      role: "fetchBasicDetails",
      cmd: "fetch-basic-details",
    },
    fetchBankDetails: { role: "fetchBankDetails", cmd: "fetch-bank-details" },
    fetchVerificationDetails: {
      role: "fetchVerificationDetails",
      cmd: "fetch-verification-details",
    },
    fetchDocumentsDetails: {
      role: "fetchDocumentsDetails",
      cmd: "fetch-documents-details",
    },
    createUpdateBasicDetails: {
      role: "createUpdateBasicDetails",
      cmd: "create-update-basic-details",
    },
    createUpdateBankDetails: {
      role: "createUpdateBankDetails",
      cmd: "create-update-bank-details",
    },
    createUpdateVerification: {
      role: "createUpdateVerification",
      cmd: "create-update-verification",
    },
    fetchSellerBasicDetailsById: {
      role: "fetchSellerBasicDetailsId",
      cmd: "fetch-seller-basic-details-by-id",
    },
    fetchSellerBankDetailsById: {
      role: "fetchSellerBankDetailsById",
      cmd: "fetch-seller-bank-details-by-id",
    },
    createUpdateDocuments: {
      role: "createUpdateDocuments",
      cmd: "create-update-documents",
    },
    fetchSellerVerificationById: {
      role: "fetchSellerVerificationById",
      cmd: "fetch-seller-verification-by-id",
    },
    fetchSellerDocumentsById: {
      role: "fetchSellerDocumentsById",
      cmd: "fetch-seller-Documents-by-id",
    },
  },
  KAFKA: {
    fetchSellerProfile: "fetchSellerProfile",
    fetchBasicDetails: "fetchBasicDetails",
    fetchBankDetails: "fetchBankDetails",
    fetchVerificationDetails: "fetchVerificationDetails",
    fetchDocumentsDetails: "fetchDocumentsDetails",
    createUpdateBasicDetails: "createUpdateBasicDetails",
    createUpdateBankDetails: "createUpdateBankDetails",
    createUpdateVerification: "createUpdateVerification",
    fetchSellerBasicDetailsById: "fetchSellerBasicDetailsById",
    fetchSellerBankDetailsById: "fetchSellerBankDetailsById",
    createUpdateDocuments: "createUpdateDocuments",
    fetchSellerVerificationById: "fetchSellerVerificationById",
    fetchSellerDocumentsById: "fetchSellerDocumentsById",
  },
  REDIS: {},
  RABBITMQ: {},
};
export const NOTIFICATION_MS_PATTERN = {
  TCP: {},
  KAFKA: {},
  REDIS: {},
  RABBITMQ: {},
};

export const USER_MS_BUYER_PATTERN = {
  TCP: {
    fetchBuyerProfile: {
      role: "fetchBuyerProfile",
      cmd: "fetch-buyer-profile",
    },
    fetchAllBuyers: { role: "fetchAllBuyers", cmd: "fetch-all-buyers" },
  },
  KAFKA: {
    fetchBuyerProfile: "fetchBuyerProfile",
    fetchAllBuyers: "fetchAllBuyers",
  },
  REDIS: {},
  RABBITMQ: {},
};

export const USER_MS_FINANCIER_PATTERN = {
  TCP: {
    fetchAllFinanciers: {
      role: "fetchAllFinanciers",
      cmd: "fetch-all-financiers",
    },
    fetchFinancierBasicDetailsById: {
      role: "fetchFinancierBasicDetailsById",
      cmd: "fetch-financier-basic-details-by-id",
    },
    fetchFinancierBankDetailsById: {
      role: "fetchFinancierBankDetailsById",
      cmd: "fetch-financier-bank-details-by-id",
    },
    fetchFinancierVerificationById: {
      role: "fetchFinancierVerificationById",
      cmd: "fetch-financier-verification-by-id",
    },
    fetchFinancierDocumentsById: {
      role: "fetchFinancierDocumentsById",
      cmd: "fetch-financier-documents-by-id",
    },
  },
  KAFKA: {
    fetchAllFinanciers: "fetchAllFinanciers",
    fetchFinancierBasicDetailsById: "fetchFinancierBasicDetailsById",
    fetchFinancierBankDetailsById: "fetchFinancierBankDetailsById",
    fetchFinancierVerificationById: "fetchFinancierVerificationById",
    fetchFinancierDocumentsById: "fetchFinancierDocumentsById",
  },
  REDIS: {},
  RABBITMQ: {},
};
