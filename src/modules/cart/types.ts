export interface addProductToCartBody {
  product_id: string
}
export interface updateCartBody {
  cart_id: string;
  variant_id: string;
  quantity: number;
}