import { useState } from "react";
import { sendMessage } from "../Api";

interface Message {
    role: "user" | "bot";
    text: string;
}

export default function Chat() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {

        if (!question.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: "user", text: question.trim() }
        ]
        setMessages(newMessages);
        setQuestion("");
        setLoading(true);

        try {
            const res = await sendMessage(question);

            setMessages([
                ...newMessages,
                { role: "bot", text: res.data.answer },
            ]);
        } catch (err) {
            console.error(err);
            setMessages([
                ...newMessages,
                { role: "bot", text: "Error getting response" },
            ]);
        }
    }
    return (
        <div className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col h-[500px]">
            <h2 className="text-white text-lg font-semibold mb-3">Chat</h2>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg max-w-[80%] ${msg.role === "user"
                                ? "bg-blue-600 text-white ml-auto"
                                : "bg-gray-700 text-white"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="text-gray-400 text-sm">Typing...</div>
                )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask something about your PDF..."
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                />

                <button
                    onClick={handleSend}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
}