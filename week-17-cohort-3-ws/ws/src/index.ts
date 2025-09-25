import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.send("user Connected");
  let value = 1;

  socket.on("message", (e) => {
    socket.send(e.toString());
  });
});
