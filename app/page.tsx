"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import AnimatedBg from "../components/AnimatedBg";

const MODES = [
  "Frontend",
  "Backend",
  "HR",
  "System Design",
  "AI/ML",
  "DevOps",
];

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [mode, setMode] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: input, mode }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error fetching response" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex bg-[#f9fafb] relative overflow-hidden">

      {!mode && <AnimatedBg />}

      {/* SIDEBAR */}
      {showSidebar && (
        <div className="w-64 bg-white border-r p-5 flex flex-col relative z-10">

          <h1 className="text-lg font-bold mb-6">Interview Copilot</h1>

          <button
            onClick={() => {
              setMode(null);
              setMessages([]);
              setShowSidebar(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold hover:bg-gray-200"
          >
            ← Home
          </button>

          <div className="space-y-2 mt-3">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setMessages([]);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-base font-semibold ${
                  mode === m
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10">

        {!mode && (
          <div className="flex flex-col items-center justify-center h-full">

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="absolute top-6 left-6 px-3 py-2 border rounded-md bg-white shadow"
            >
              ☰
            </button>

            <h1 className="text-6xl font-bold mb-4">
              Interview Copilot
            </h1>

            <p className="text-xl text-gray-700 mb-14">
              Practice interviews with AI
            </p>

            <div className="flex gap-6 flex-wrap justify-center">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setShowSidebar(true);
                  }}
                  className="px-10 py-4 bg-white border rounded-xl shadow-sm 
                  hover:shadow-lg hover:-translate-y-1 hover:bg-black hover:text-white
                  transition-all text-lg font-semibold"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode && (
          <>
            <div className="p-4 bg-white border-b flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="px-3 py-1 border rounded-md"
              >
                ☰
              </button>
              <h2 className="font-semibold">{mode}</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="px-5 py-3 bg-white border rounded-xl max-w-xl whitespace-pre-wrap break-words">
                    
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2">{children}</p>
                        ),
                        li: ({ children }) => (
                          <li className="ml-4 list-disc">{children}</li>
                        ),
                        code(props: any) {
                          const { inline, children } = props;

                          return inline ? (
                            <code className="bg-gray-200 px-1 rounded text-sm">
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-black text-white p-3 rounded-lg overflow-x-auto">
                              <code>{children}</code>
                            </pre>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>

                  </div>
                </div>
              ))}
              {loading && <div>Thinking...</div>}
              <div ref={bottomRef} />
            </div>

            <div className="p-5 border-t bg-white flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              />
              <button
                onClick={sendMessage}
                className="px-6 bg-black text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}