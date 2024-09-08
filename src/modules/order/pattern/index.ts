export const PRODUCT_MS_ORDER_PATTERN: any = {
    TCP: {
        fetchOrderForAdmin: {
            role: 'fetchOrderForAdmin',
            cmd: 'fetch-order-for-admin'
        },
        fetchOrderForSeller: {
            role: 'fetchOrderForSeller',
            cmd: 'fetch-order-for-seller'
        },
        fetchOrderForUser: {
            role: 'fetchOrderForUser',
            cmd: 'fetch-order-for-user'
        },
        createOrder: {
            role: 'createOrder',
            cmd: 'create-order'
        },
        updateOrderStatus: {
            role: 'updateOrderStatus',
            cmd: 'update-order-status'
        },
        updateProductOrderStatus: {
            role: 'updateProductOrderStatus',
            cmd: 'update-product-order-status'
        },
        fetchOrderByIdForSeller: {
            role: 'fetchOrderByIdForSeller',
            cmd: 'fetch-order-by-id-for-seller'
        },
        fetchOrderByIdForUser: {
            role: 'fetchOrderByIdForUser',
            cmd: 'fetch-order-by-id-for-user'
        }
    },
    KAFKA: {
        fetchOrderForAdmin:"fetchOrderForAdmin",
        fetchOrderForSeller: 'fetchOrderForSeller',
        fetchOrderForUser: 'fetchOrderForUser',
        createOrder: 'createOrder',
        updateOrderStatus: 'updateOrderStatus',
        fetchOrderByIdForSeller: "fetchOrderByIdForSeller",
        fetchOrderByIdForUser: "fetchOrderByIdForUser",
        updateProductOrderStatus: "updateProductOrderStatus"
    },
    REDIS: [],
    RABBITMQ: [],
};


export const USER_PATTERN = {
    TCP: {
        findUserById: {
            role: "findUserById",
            cmd: "find-user-by-id"
        }
    },
    KAFKA: {
        findUserById: "findUserById"
    },
    REDIS: {},
    RABBITMQ: {},
};