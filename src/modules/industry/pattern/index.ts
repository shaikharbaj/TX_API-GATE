export const PRODUCT_MS_INDUSTRY_PATTERN = {
  TCP: {
    fetchAllIndustry: {
      role: 'fetchAllIndustry',
      cmd: 'fetch-all-industry'
    },
    fetchAllDeletedIndustry: {
      role: 'fetchAllDeletedIndustry',
      cmd: 'fetch-all-deleted-industry'
    },
    fetchAllIndustryForDropdown: {
      role: 'fetchAllIndustryForDropdown',
      cmd: 'fetch-all-industry-for-dropdown'
    },
    findIndustryById: {
      role: 'findIndustryById',
      cmd: 'find-industry-by-id'
    },
    createIndustry: {
      role: 'createIndustry',
      cmd: 'create-industry'
    },
    updateIndustry: {
      role: 'updateIndustry',
      cmd: 'update-industry'
    },
    restoreIndustry: {
      role: 'restoreIndustry',
      cmd: "restore-industry"
    },
    toggleIndustryVisibility: {
      role: 'toggleIndustryVisibility',
      cmd: 'toggle-industry-visibility'
    },
    deleteIndustry: {
      role: 'deleteIndustry',
      cmd: 'delete-industry'
    },

  },
  KAFKA: {
    fetchAllIndustry: 'fetchAllIndustry',
    fetchAllDeletedIndustry: 'fetchAllDeletedIndustry',
    fetchAllIndustryForDropdown: 'fetchAllIndustryForDropdown',
    findIndustryById: 'findIndustryById',
    createIndustry: 'createIndustry',
    updateIndustry: 'updateIndustry',
    restoreIndustry: 'restoreIndustry',
    toggleIndustryVisibility: 'toggleIndustryVisibility',
    deleteIndustry: 'deleteIndustry',
  },
  REDIS: [],
  RABBITMQ: [],
};
