export const CMS_MS_FAQ_CATEGORY_PATTERN = {
  TCP: {
    fetchAllFaqCategory: { role: "fetchAllFaqCategory", cmd: "fetch-all-faq-category" },
    fetchAllDeletedFaqCategory: {
      role: "fetchAllDeletedFaqCategory",
      cmd: "fetch-all-deleted-faq-category",
    },
    fetchAllFaqCategoryForDropdown: {
      role: 'fetchAllFaqCategoryForDropdown',
      cmd: 'fetch-all-faq-category-for-dropdown',
    },
    findFaqCategoryById: { role: "findFaqCategoryById", cmd: "find-faq-category-by-id" },
    createFaqCategory: { role: "createFaqCategory", cmd: "create-faq-category" },
    updateFaqCategory: { role: "updateFaqCategory", cmd: "update-faq-category" },
    deleteFaqCategory: { role: "deleteFaqCategory", cmd: "delete-faq-category" },
    restoreDeletedFaqCategory: {
      role: "restoreDeletedFaqCategory",
      cmd: "restore-deleted-faq-category",
    },
    toggleFaqCategoryVisibility: {
      role: "toggleFaqCategoryVisibility",
      cmd: "toggle-faq-category-visibility",
    },
  },
  KAFKA: {
    fetchAllFaqCategory: "fetchAllFaqCategory",
    fetchAllDeletedFaqCategory: "fetchAllDeletedFaqCategory",
    fetchAllFaqCategoryForDropdown: "fetchAllFaqCategoryForDropdown",
    findFaqCategoryById: "findFaqCategoryById",
    createFaqCategory: "createFaqCategory",
    updateFaqCategory: "updateFaqCategory",
    deleteFaqCategory: "deleteFaqCategory",
    restoreDeletedFaqCategory: "restoreDeletedFaqCategory",
    toggleFaqCategoryVisibility: "toggleFaqCategoryVisibility",
  },
  REDIS: {},
  RABBITMQ: {},
};
