import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_ORDER_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'PRODUCT_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'order-api-gateway',
      brokers: [process.env.PRODUCT_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'order-api-gateway-consumer',
    },
  },
};