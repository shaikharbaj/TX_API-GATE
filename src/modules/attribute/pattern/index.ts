export const ATTRIBUTE_PRODUCT_MS_PATTERN = {
  TCP: {
    fetchAllAttribute: {
      role: "fetchAllAttribute",
      cmd: "fetch-all-attribute",
    },
    fetchAllDeletedAttribute: {
      role: "fetchAllDeletedAttribute",
      cmd: "fetch-all-deleted-attribute",
    },
    fetchAllAttributeForDropdown: {
      role: "fetchAllAttributeForDropdown",
      cmd: "fetch-all-attribute-for-dropdown",
    },
    fetchAttributeByCategory: {
      role: "fetchAttributeByCategory",
      cmd: "fetch-attribute-by-category",
    },
    findAttributeById: {
      role: "findAttributeById",
      cmd: "find-attribute-by-id",
    },
    createAttribute: {
      role: "createAttribute",
      cmd: "create-attribute",
    },
    toggleAttributeVisibility: {
      role: "toggleAttributeVisibility",
      cmd: "toggle-attribute-visibility",
    },
    updateAttribute: {
      role: "updateAttribute",
      cmd: "update-attribute",
    },
    deleteAttribute: {
      role: "deleteAttribute",
      cmd: "delete-attribute",
    },
    restoreAttribute: {
      role: "restoreAttribute",
      cmd: "restore-attribute",
    },
  },
  KAFKA: {
    fetchAllAttribute: "fetchAllAttribute",
    fetchAllDeletedAttribute: "fetchAllDeletedAttribute",
    fetchAllAttributeForDropdown: "fetchAllAttributeForDropdown",
    fetchAttributeByCategory: "fetchAttributeByCategory",
    findAttributeById: "findAttributeById",
    createAttribute: "createAttribute",
    updateAttribute: "updateAttribute",
    restoreAttribute: "restoreAttribute",
    toggleAttributeVisibility: "toggleAttributeVisibility",
    deleteAttribute: "deleteAttribute",
  },
  REDIS: [],
  RABBITMQ: [],
};
