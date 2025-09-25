import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const userMessage = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (socket && userMessage.current) {
      const msg = userMessage.current.value;
      socket.send(msg);
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (ev: MessageEvent<string>) => {
      alert(ev.data);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <input
        type="text"
        ref={userMessage}
        placeholder="Type your message here"
      />
      <button onClick={handleClick}>send</button>
    </>
  );
}

export default App;
