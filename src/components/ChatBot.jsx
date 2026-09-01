import { useState } from "react";
import { sendMessage } from "../services/gemini";

function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const reply = await sendMessage(input);

    const botMessage = {
      sender: "bot",
      text: reply,
    };

    setMessages((prev) => [...prev, botMessage]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Gemini AI Chat</h2>

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;