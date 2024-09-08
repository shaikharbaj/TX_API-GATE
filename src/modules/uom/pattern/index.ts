export const PRODUCT_MS_UOM_PATTERN = {
  TCP: {
    fetchAllUom: {
      role: 'fetchAllUom',
      cmd: 'fetch-all-uom'
    },
    fetchAllDeletedUom: {
      role: 'fetchAllDeletedUom',
      cmd: 'fetch-all-deleted-uom'
    },
    fetchAllUomForDropdown: {
      role: 'fetchAllUomForDropdown',
      cmd: 'fetch-all-uom-for-dropdown'
    },
    findUomById: {
      role: 'findUomById',
      cmd: 'find-uom-by-id'
    },
    createUom: {
      role: 'createUom',
      cmd: 'create-uom'
    },
    updateUom: {
      role: 'updateUom',
      cmd: 'update-uom'
    },
    restoreUom: {
      role: 'restoreUom',
      cmd: "restore-uom"
    },
    toggleUomVisibility: {
      role: 'toggleUomVisibility',
      cmd: 'toggle-uom-visibility'
    },
    deleteUom: {
      role: 'deleteUom',
      cmd: 'delete-uom'
    },
    fetchRoundRule: {
      role: 'fetchRoundRule',
      cmd: 'fetch-round-rule'
    },
    fetchRoundValue: {
      role: 'fetchRoundValue',
      cmd: 'fetch-round-value'
    },
    fetchUomByIdForDropdown: {
      role: "fetchUomByIdForDropdown",
      cmd: "fetch-uom-by-is-for-dropdown",
    },
  },
  KAFKA: {
    fetchAllUom: 'fetchAllUom',
    fetchAllDeletedUom: 'fetchAllDeletedUom',
    fetchAllUomForDropdown: 'fetchAllUomForDropdown',
    findUomById: 'findUomById',
    createUom: 'createUom',
    updateUom: 'updateUom',
    restoreUom: 'restoreUom',
    toggleUomVisibility: 'toggleUomVisibility',
    deleteUom: 'deleteUom',
    fetchRoundRule: 'fetchRoundRule',
    fetchRoundValue: 'fetchRoundValue',
    fetchUomByIdForDropdown:'fetchUomByIdForDropdown'
  },
  REDIS: [],
  RABBITMQ: [],
};
