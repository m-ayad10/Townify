import { redisSubscriber } from "./redis.js";
import { handleRedisEvent } from "../handlers/handleRedisEvent.js";

export async function startRedisSubscription() {
  await redisSubscriber.subscribe("SPACE_EVENTS", message => {
    const event = JSON.parse(message);
    handleRedisEvent(event);
  });
}
