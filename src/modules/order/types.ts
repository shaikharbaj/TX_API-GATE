export interface OrderProduct {
    product_id: string;
    quantity: string;
    price: string;
}

export interface CreateOrderBody {
    products: OrderProduct[];
}

export interface UpdateOrderStatusBody {
    status: string;
}

export interface UpdateProductOrderStatusBody {
    status: string;
}