export const PRODUCT_MS_PRODUCT_RATING_PATTERN = {
  TCP: {
    fetchAllProductRating: {
      role: 'fetchAllProductRating',
      cmd: 'fetch-all-product-rating'
    },
    fetchAllDeletedProductRating: {
      role: 'fetchAllDeletedProductRating',
      cmd: 'fetch-all-deleted-product-rating'
    },
    findProductRatingById: {
      role: 'findProductRatingById',
      cmd: 'find-product-rating-by-id'
    },
    createProductRating: {
      role: 'createProductRating',
      cmd: 'create-product-rating'
    },
    restoreProductRating: {
      role: 'restoreProductRating',
      cmd: "restore-product-rating"
    },
    toggleProductRatingVisibility: {
      role: 'toggleProductRatingVisibility',
      cmd: 'toggle-product-rating-visibility'
    },
    deleteProductRating: {
      role: 'deleteProductRating',
      cmd: 'delete-product-rating'
    },

  },
  KAFKA: {
    fetchAllProductRating: 'fetchAllProductRating',
    fetchAllDeletedProductRating: 'fetchAllDeletedProductRating',
    findProductRatingById: 'findProductRatingById',
    createProductRating: 'createProductRating',
    restoreProductRating: 'restoreProductRating',
    toggleProductRatingVisibility: 'toggleProductRatingVisibility',
    deleteProductRating: 'deleteProductRating',
  },
  REDIS: [],
  RABBITMQ: [],
};
