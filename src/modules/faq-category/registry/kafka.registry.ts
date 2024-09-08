import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_FAQ_CATEGORY_TO_CMS_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'CMS_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'faq-category-api-gateway',
      brokers: [process.env.CMS_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'faq-category-api-gateway-consumer',
    },
  },
};