export const PRODUCT_MS_WISHLIST_PATTERN = {
  TCP: {
    fetchWishlistProduct: {
      role: 'fetchAllWishlistProduct',
      cmd: 'fetch-all-wishlist-product',
    },
    AddProductToWishList: {
      role: 'AddProductToWishList',
      cmd: 'add-product-to-wishlist'
    },
    RemoveProductFromWishList: {
      role: 'RemoveProductFromWishList',
      cmd: 'remove-product-from-wishlist'
    },
  },
  KAFKA: {
    fetchWishlistProduct: 'fetchWishlistProduct',
    AddProductToWishList: 'AddProductToWishList',
    RemoveProductFromWishList: 'RemoveProductFromWishList'
  },
  REDIS: [],
  RABBITMQ: [],
};
