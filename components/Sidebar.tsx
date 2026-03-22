type Props = {
  mode: string | null;
  setMode: (mode: string) => void;
  resetChat: () => void;
};

export default function Sidebar({ mode, setMode, resetChat }: Props) {
  const modes = ["Frontend", "Backend", "HR", "System Design"];

  return (
    <div className="w-1/4 border-r border-gray-800 p-5 hidden md:block">
      <h1 className="text-xl font-bold mb-6">🚀 Interview Copilot</h1>

      <div className="space-y-3">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              resetChat();
            }}
            className={`w-full p-3 rounded-lg transition ${
              mode === m
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}