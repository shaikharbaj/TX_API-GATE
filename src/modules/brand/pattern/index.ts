export const PRODUCT_MS_BRAND_PATTERN = {
  TCP: {
    fetchAllBrand: {
      role: "fetchAllBrand",
      cmd: "fetch-all-brand",
    },
    fetchAllDeletedBrand: {
      role: "fetchAllDeletedBrand",
      cmd: "fetch-all-deleted-brand",
    },
    fetchAllBrandForDropdown: {
      role: "fetchAllBrandForDropdown",
      cmd: "fetch-all-brand-for-dropdown",
    },
    findBrandById: {
      role: "findBrandById",
      cmd: "find-brand-by-id",
    },
    createBrand: {
      role: "createBrand",
      cmd: "create-brand",
    },
    updateBrand: {
      role: "updateBrand",
      cmd: "update-brand",
    },
    restoreBrand: {
      role: "restoreBrand",
      cmd: "restore-brand",
    },
    toggleBrandVisibility: {
      role: "toggleBrandVisibility",
      cmd: "toggle-brand-visibility",
    },
    deleteBrand: {
      role: "deleteBrand",
      cmd: "delete-brand",
    },
    fetchBrandByIdForDropdown: {
      role: "fetchBrandByIdForDropdown",
      cmd: "fetch-brand-by-is-for-dropdown",
    },
  },
  KAFKA: {
    fetchAllBrand: "fetchAllBrand",
    fetchAllDeletedBrand: "fetchAllDeletedBrand",
    fetchAllBrandForDropdown: "fetchAllBrandForDropdown",
    findBrandById: "findBrandById",
    createBrand: "createBrand",
    updateBrand: "updateBrand",
    restoreBrand: "restoreBrand",
    toggleBrandVisibility: "toggleBrandVisibility",
    deleteBrand: "deleteBrand",
    fetchBrandByIdForDropdown:"fetchBrandByIdForDropdown"
  },
  REDIS: [],
  RABBITMQ: [],
};
