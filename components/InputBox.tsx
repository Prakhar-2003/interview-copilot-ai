type Props = {
  input: string;
  setInput: (val: string) => void;
  sendMessage: () => void;
  loading: boolean;
};

export default function InputBox({
  input,
  setInput,
  sendMessage,
  loading,
}: Props) {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your answer..."
          className="flex-1 p-3 rounded-lg bg-gray-900 outline-none"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-5 rounded-lg hover:bg-blue-500 transition"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}