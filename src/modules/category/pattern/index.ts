export const PRODUCT_MS_CATEGORY_PATTERN = {
  TCP: {
    fetchCategoryBySlug: {
      role: 'fetchCategoryBySlug',
      cmd: 'fetch-category-by-slug'
    },
    fetchAllCategory: {
      role: 'fetchAllCategory',
      cmd: 'fetch-all-category'
    },
    fetchAllDeletedCategory: {
      role: 'fetchAllDeletedCategory',
      cmd: 'fetch-all-deleted-category'
    },
    fetchAllCategoryForDropdown: {
      role: 'fetchAllCategoryForDropdown',
      cmd: 'fetch-all-category-for-dropdown'
    },
    fetchCategoryByIdForDropdown: {
      role: 'fetchCategoryByIdForDropdown',
      cmd: 'fetch-category-by-id-for-dropdown'
    },
    findCategoryById: {
      role: 'findCategoryById',
      cmd: 'find-category-by-id'
    },
    createCategory: {
      role: 'createCategory',
      cmd: 'create-category'
    },
    updateCategory: {
      role: 'updateCategory',
      cmd: 'update-category'
    },
    restoreCategory: {
      role: 'restoreCategory',
      cmd: "restore-category"
    },
    toggleCategoryVisibility: {
      role: 'toggleCategoryVisibility',
      cmd: 'toggle-category-visibility'
    },
    deleteCategory: {
      role: 'deleteCategory',
      cmd: 'delete-category'
    },
    fetchProductCategorySellerDropdown:{
      role:"fetchProductCategorySellerDropdown",
      cmd:'fetch-product-category-seller-dropdown'
    }

  },
  KAFKA: {
    fetchCategoryBySlug: 'fetchCategoryBySlug',
    fetchAllCategory: 'fetchAllCategory',
    fetchAllDeletedCategory: 'fetchAllDeletedCategory',
    fetchAllCategoryForDropdown: 'fetchAllCategoryForDropdown',
    fetchCategoryByIdForDropdown: 'fetchCategoryByIdForDropdown',
    findCategoryById: 'findCategoryById',
    createCategory: 'createCategory',
    updateCategory: 'updateCategory',
    restoreCategory: 'restoreCategory',
    toggleCategoryVisibility: 'toggleCategoryVisibility',
    deleteCategory: 'deleteCategory',
    fetchProductCategorySellerDropdown:"fetchProductCategorySellerDropdown"
  },
  REDIS: [],
  RABBITMQ: [],
};
