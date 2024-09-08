import { PRODUCT_MICROSERVICE_TCP_REGISTRY } from "./registry/tcp.registry";
import { API_GATEWAY_BRAND_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY } from "./registry/kafka.registry";
export const MODULE_CONFIG = {
  transport: process.env.PRODUCT_MICROSERVICE_TRANSPORT,
  TCP: PRODUCT_MICROSERVICE_TCP_REGISTRY,
  KAFKA: API_GATEWAY_BRAND_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY,
  REDIS: {},
  RABBITMQ: {},
};
