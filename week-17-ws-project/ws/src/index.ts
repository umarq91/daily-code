import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.on("message", (d) => {
    wss.clients.forEach((user) => {
      user.send("SOMEONE SAID" + d.toString());
    });
  });
});
