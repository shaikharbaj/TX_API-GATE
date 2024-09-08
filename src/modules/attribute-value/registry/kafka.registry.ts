import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_ATTRIBUTE_VALUE_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'PRODUCT_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'attribute-value-api-gateway',
      brokers: [process.env.PRODUCT_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'attribute-value-api-gateway-consumer',
    },
  },
};