import { API_GATEWAY_USER_ADDRESS_TO_USER_MICROSERVICE_KAFKA_REGISTRY } from "./registry/kafka.registry";
import { USER_MICROSERVICE_TCP_REGISTRY } from "./registry/tcp.registry";

export const MODULE_CONFIG = {
  transport: process.env.USER_MICROSERVICE_TRANSPORT,
  TCP: USER_MICROSERVICE_TCP_REGISTRY,
  KAFKA: API_GATEWAY_USER_ADDRESS_TO_USER_MICROSERVICE_KAFKA_REGISTRY,
};
