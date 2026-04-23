import { createServer } from "http";
import { WebSocketServer } from "ws";
import { connectRedisSubscriber } from "./redis/redis.js";
import { startRedisSubscription } from "./redis/subcribe.js";
import { handleAuth } from "./handlers/handleAuth.js";
import { onlineUsers } from "./onlineUsers.js";

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy' }));
  }
});
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', msg => handleAuth(ws, msg));

  ws.on("close", () => {
    const userId = (ws as any).userId;
    if (userId) {
      onlineUsers.delete(userId);
    }
  });
})

async function start() {
  await connectRedisSubscriber();
  await startRedisSubscription();

  server.listen(3010, () => {
    console.log("Notification WS running on 3010");
  });
}

start();
