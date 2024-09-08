import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_INDUSTRY_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'PRODUCT_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'industry-api-gateway',
      brokers: [process.env.PRODUCT_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'industry-api-gateway-consumer',
    },
  },
};