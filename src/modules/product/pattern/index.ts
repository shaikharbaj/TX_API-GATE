export const PRODUCT_MS_PATTERN = {
  TCP: {
    fetchAllProduct: {
      role: 'fetchAllProduct',
      cmd: 'fetch-all-product'
    },
    fetchProductBasicInformation: {
      role: "fetchProductBasicInformation",
      cmd: "fetch-product-basic-information",
    },
    createProductBasicInformation: {
      role: "createProductBasicInformation",
      cmd: "create-product-basic-information",
    },
    fetchProductVariants: {
      role: "fetchProductVariants",
      cmd: "fetch-product-variants",
    },
    createProductVariants: {
      role: "createProductVariants",
      cmd: "create-product-variants",
    },
    fetchProductLocations: {
      role: "fetchProductLocations",
      cmd: "fetch-product-locations",
    },
    createProductLocations: {
      role: "createProductLocations",
      cmd: "create-product-locations",
    },
    fetchProductShippingInformation: {
      role: "fetchProductShippingInformation",
      cmd: "fetch-product-shipping-information",
    },
    createProductShippingInformation: {
      role: "createProductShippingInformation",
      cmd: "create-product-shipping-information",
    },
    fetchProductSeoInformation: {
      role: "fetchProductSeoInformation",
      cmd: "fetch-product-seo-information",
    },
    createProductSeoInformation: {
      role: "createProductSeoInformation",
      cmd: "create-product-seo-information",
    },
    fetchAllProductForShop: {
      role: "fetchAllProductForShop",
      cmd: "fetch-all-product-for-shop",
    },
    fetchProductBySubCategorySlug:{role:"fetchProductBySubCategorySlug",cmd:"fetch-product-by-subcategory-slug"},
    fetchProductByBrandSlug:{role:"fetchProductByBrandSlug",cmd:"fetch-product-by-brand-slug"},
    fetchProductBySlug:{role:"fetchProductBySlug",cmd:"fetch-product-by-slug"},
    fetchProductAttributesById:{role:"fetchProductAttributesById",cmd:"fetch-product-attribute-by-id"}
  },
  KAFKA: {
    fetchAllProduct: "fetchAllProduct",
    fetchProductBasicInformation: "fetchProductBasicInformation",
    createProductBasicInformation: "createProductBasicInformation",
    fetchProductVariants: "fetchProductVariants",
    createProductVariants: "createProductVariants",
    fetchProductLocations: "fetchProductLocations",
    createProductLocations: "createProductLocations",
    fetchProductShippingInformation: "fetchProductShippingInformation",
    createProductShippingInformation: "createProductShippingInformation",
    fetchProductSeoInformation: "fetchProductSeoInformation",
    createProductSeoInformation: "createProductSeoInformation",
    fetchAllProductForShop: "fetchAllProductForShop",
    fetchProductBySubCategorySlug:"fetchProductBySubCategorySlug",
    fetchProductByBrandSlug:"fetchProductByBrandSlug",
    fetchProductBySlug:"fetchProductBySlug",
    fetchProductAttributesById:"fetchProductAttributesById",
  },
  REDIS: [],
  RABBITMQ: [],
};
