import { Message } from "@/types";
import MessageBubble from "./MessageBubble";
import { motion } from "framer-motion";

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function ChatWindow({ messages, loading }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <MessageBubble msg={msg} />
        </motion.div>
      ))}

      {loading && (
        <div className="text-gray-400 animate-pulse">
          Interviewer is thinking...
        </div>
      )}
    </div>
  );
}