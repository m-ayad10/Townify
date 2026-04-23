import { createServer } from "http";
import { WebSocketServer } from "ws"
import { handleDisconnect, handleMessage } from "./handlers.js";
import type WebSocket from "ws";


const server = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy' }));
    }
});

server.listen('3008', () => {
    console.log("Server Listing at 3008");
})


const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {

    (ws as any).isAlive = true;

    ws.on('message', (message: any) => handleMessage(ws, message));

    ws.on('close', () => handleDisconnect(ws));
})