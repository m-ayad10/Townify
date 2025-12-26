import type { ServerMessage } from "./socketTypes";

export const handleSocketMessage = (message: ServerMessage) => {
  switch (message.type) {
    case "ROOM_STATE":
      console.log("Initial users:", message.payload);
      break;

    case "USER_JOINED":
      console.log("User joined:", message.payload);
      break;

    case "USER_MOVED":
      console.log("User moved:", message.payload);
      break;

    case "USER_LEFT":
      console.log("User left:", message.payload);
      break;
  }
};
