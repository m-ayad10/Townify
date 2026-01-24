import { useEffect } from "react";

export function useNotificationSocket(userId?: string) {
  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket("ws://localhost:3010");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "AUTH",
          payload: { userId },
        })
      );
    };

    ws.onmessage = e => {
      const msg = JSON.parse(e.data);

      if (msg.type === "JOIN_APPROVED") {
        window.dispatchEvent(
          new CustomEvent("JOIN_APPROVED", { detail: msg.payload })
        );
      }

      if (msg.type === "JOIN_DECLINED") {
        window.dispatchEvent(new Event("JOIN_DECLINED"));
      }

      // ✅ FIXED JOIN REQUEST EVENT
      if (msg.type === "JOIN_REQUEST_RECEIVED") {
        window.dispatchEvent(
          new CustomEvent("JOIN_REQUEST_RECEIVED", {
            detail: msg.payload,
          })
        );
      }

    };

    ws.onerror = () => {
      console.warn("⚠️ Notification WS error");
    };

    return () => {
      ws.close();
    };
  }, [userId]);
}
