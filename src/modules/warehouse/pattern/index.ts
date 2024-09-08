export const PRODUCT_MS_WAREHOUSE_PATTERN = {
  TCP: {
    fetchAllWarehouse: {
      role: "fetchAllWarehouse",
      cmd: "fetch-all-warehouse",
    },
    fetchAllDeletedWarehouse: {
      role: "fetchAllDeletedWarehouse",
      cmd: "fetch-all-deleted-warehouse",
    },
    fetchAllWarehouseForDropdown: {
      role: "fetchAllWarehouseForDropdown",
      cmd: "fetch-all-warehouse-for-dropdown",
    },
    createWarehouse: {
      role: "createWarehouse",
      cmd: "create-warehouse",
    },
    findWarehouseById: {
      role: "findWarehouseById",
      cmd: "find-warehouse-by-id",
    },
    toggleWarehouseVisibility: {
      role: "toggleWarehouseVisibility",
      cmd: "toggle-warehouse-visibility",
    },
    updateWarehouse: {
      role: "updateWarehouse",
      cmd: "update-warehouse",
    },
    restoreWarehouse: {
      role: "restoreWarehouse",
      cmd: "restore-warehouse",
    },
    deleteWarehouse: {
      role: "deleteWarehouse",
      cmd: "delete-warehouse",
    },
  },
  KAFKA: {
    fetchAllWarehouse: "fetchAllWarehouse",
    fetchAllDeletedWarehouse: "fetchAllDeletedWarehouse",
    fetchAllWarehouseForDropdown: "fetchAllWarehouseForDropdown",
    createWarehouse: "createWarehouse",
    findWarehouseById: "findWarehouseById",
    toggleWarehouseVisibility: "toggleWarehouseVisibility",
    updateWarehouse: "updateWarehouse",
    deleteWarehouse: "deleteWarehouse",
    restoreWarehouse: "restoreWarehouse",
  },
  REDIS: [],
  RABBITMQ: [],
};
