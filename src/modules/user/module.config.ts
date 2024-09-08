import { USER_MICROSERVICE_TCP_REGISTRY } from "./registry/tcp.registry";
import { API_GATEWAY_USER_TO_USER_MICROSERVICE_KAFKA_REGISTRY } from "./registry/kafka.registry";
export const MODULE_CONFIG = {
  transport: process.env.USER_MICROSERVICE_TRANSPORT,
  TCP: USER_MICROSERVICE_TCP_REGISTRY,
  KAFKA: API_GATEWAY_USER_TO_USER_MICROSERVICE_KAFKA_REGISTRY,
  REDIS: {},
  RABBITMQ: {},
};