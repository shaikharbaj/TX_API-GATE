export const PRODUCT_MS_CART_PATTERN = {
  TCP: {
    fetchCartProduct: {
      role: 'fetchCartProduct',
      cmd: 'fetch-cart-product',
    },
    addProductToCart: {
      role: "addProductToCart",
      cmd: "add-product-to-cart",
    },
    removeProductFromCart: {
      role: "removeProductFromCart",
      cmd: "remove-product-from-cart",
    },
    updateCart:{
        role:"updateCart",
        cmd:"update-cart"
    }
  },
  KAFKA: {
    fetchCartProduct: "fetchCartProduct",
    addProductToCart: "addProductToCart",
    removeProductFromCart: "removeProductFromCart",
    updateCart:"updateCart"
  },
  REDIS: [],
  RABBITMQ: [],
};
