import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]> ([]);

  const handleClick = () => {
    if (socket) {
      socket.send("HELLO FROM REACT");
    }
  };

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8080");
    setSocket(wss);

    wss.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };
  }, []);
  return (
    <div
      style={{
        color: "black",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>Send</button>

      {messages?.map((m) => (
        <div> {m}</div>
      ))}
    </div>
  );
};

export default App;
