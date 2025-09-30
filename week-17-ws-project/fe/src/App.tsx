import React, { useEffect, useRef, useState } from "react";

interface Cursor {
  id: string;
  x: number;
  y: number;
}

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [totalUsers, setUsers] = useState(0);
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const socketRef = useRef<WebSocket | null>(null);
  const clientId = useRef<string>(Math.random().toString(36).slice(2));

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);

      if (res.type === "count") {
        setUsers(res.payload);
      } else if (res.type === "chat") {
        setMessages((prev) => [...prev, res.payload]);
      } else if (res.type === "cursor") {
        setCursors((prev) => ({
          ...prev,
          [res.payload.id]: res.payload,
        }));
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message: input },
        })
      );
      setInput("");
    }
  };

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            type: "cursor",
            payload: { id: clientId.current, x: e.clientX, y: e.clientY },
          })
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center relative">
      {/* Cursors */}
      {Object.values(cursors).map((cursor) =>
        cursor.id !== clientId.current ? (
          <div
            key={cursor.id}
            className="absolute w-4 h-4 bg-red-500 rounded-full pointer-events-none"
            style={{
              left: cursor.x,
              top: cursor.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : null
      )}

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col h-[70vh] relative z-10">
        <div className="text-green-600 p-2">
          ✅ Connected | Total Users: {totalUsers}
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-2">
          {messages
            ?.slice()
            .reverse()
            .map((m, idx) => (
              <div
                key={idx}
                className="bg-blue-500 text-white rounded px-3 py-2 w-fit max-w-xs self-start"
              >
                {m}
              </div>
            ))}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
