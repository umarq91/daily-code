import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface Message {
  type: string;
  payload?: any;
}

function broadcast(message: Message, exclude?: WebSocket) {
  const msg = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== exclude) {
      client.send(msg);
    }
  });
}

let usersCount = 0;

wss.on("connection", (socket) => {
  usersCount++;

  // Notify all about user count
  broadcast({ type: "count", payload: usersCount });

  socket.on("message", (data) => {
    const msg: Message = JSON.parse(data.toString());

    if (msg.type === "chat") {
      broadcast({ type: "chat", payload: msg.payload.message }, socket);
    }

    if (msg.type === "cursor") {
      // send cursor position to others
      broadcast({ type: "cursor", payload: msg.payload }, socket);
    }
  });

  socket.on("close", () => {
    usersCount--;
    broadcast({ type: "count", payload: usersCount });
  });
});

console.log("✅ WebSocket server running on ws://localhost:8080");
