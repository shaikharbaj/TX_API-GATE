export const ATTRIBUTE_VALUE_PRODUCT_MS_PATTERN = {
  TCP: {
    fetchAllAttributeValue: {
      role: 'fetchAllAttributeValue',
      cmd: 'fetch-all-attribute-value',
    },
    fetchAllDeletedAttributeValue: {
      role: 'fetchAllDeletedAttributeValue',
      cmd: 'fetch-all-deleted-attribute-value',
    },
    fetchAllAttributeValueForDropdown: {
      role: 'fetchAllAttributeValueForDropdown',
      cmd: 'fetch-all-attribute-value-for-dropdown',
    },
    findAttributeValueById: {
      role: 'findAttributeValueById',
      cmd: 'find-attribute-value-by-id',
    },
    createAttributeValue: {
      role: 'createAttributeValue',
      cmd: 'create-attribute-value',
    },
    toggleAttributeValueVisibility: {
      role: 'toggleAttributeValueVisibility',
      cmd: 'toggle-attribute-value-visibility',
    },
    updateAttributeValue: {
      role: 'updateAttributeValue',
      cmd: 'update-attribute-value',
    },
    deleteAttributeValue: {
      role: 'deleteAttributeValue',
      cmd: 'delete-attribute-value',
    },
    restoreAttributeValue: {
      role: 'restoreAttributeValue',
      cmd: 'restore-attribute-value',
    },
  },
  KAFKA: {
    fetchAllAttributeValue: 'fetchAllAttributeValue',
    fetchAllDeletedAttributeValue: 'fetchAllDeletedAttributeValue',
    fetchAllAttributeValueForDropdown: 'fetchAllAttributeValueForDropdown',
    findAttributeValueById: 'findAttributeValueById',
    createAttributeValue: 'createAttributeValue',
    updateAttributeValue: 'updateAttributeValue',
    restoreAttributeValue: 'restoreAttributeValue',
    toggleAttributeValueVisibility: 'toggleAttributeValueVisibility',
    deleteAttributeValue: 'deleteAttributeValue',
  },
  REDIS: [],
  RABBITMQ: [],
};
