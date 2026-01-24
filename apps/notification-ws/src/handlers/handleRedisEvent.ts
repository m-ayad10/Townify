import WebSocket from "ws";
import { onlineUsers } from "../onlineUsers.js";
import type { SpaceEvent } from "../types.js";

export function handleRedisEvent(event: SpaceEvent) {
  const { type, payload } = event;

  switch (type) {
    
    /**   Notify ADMIN when someone requests to join  **/
    case "JOIN_REQUEST": {
      const { adminUserId, requester } = payload;

      const adminWs = onlineUsers.get(adminUserId);

      if (adminWs?.readyState === WebSocket.OPEN) {
        adminWs.send(
          JSON.stringify({
            type: "JOIN_REQUEST_RECEIVED",
            payload: requester
          })
        );
      }
      break;
    }

    /** Notify USER when request is approved **/   
    case "JOIN_APPROVED": {
      const userWs = onlineUsers.get(payload.userId);

      if (userWs?.readyState === WebSocket.OPEN) {
        userWs.send(
          JSON.stringify({
            type: "JOIN_APPROVED",
            payload: {
              spaceSlug: payload.spaceSlug,
              spaceName: payload.spaceName,
            },
          })
        );
      }
      break;
    }
  }
}
