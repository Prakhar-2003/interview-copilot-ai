import { Message } from "@/types";

export default function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-xl max-w-lg ${
          msg.role === "user" ? "bg-blue-600" : "bg-gray-800"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}