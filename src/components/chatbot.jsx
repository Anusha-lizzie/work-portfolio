import { useState } from "react";
import { chatbotAnswers } from "../data/botdata";
import "./Chatbot.css";

function getReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("name")) return chatbotAnswers.name;
  if (msg.includes("role") || msg.includes("developer"))
    return chatbotAnswers.role;
  if (msg.includes("skill")) return chatbotAnswers.skills;
  if (msg.includes("project")) return chatbotAnswers.projects;
  if (msg.includes("cert")) return chatbotAnswers.certifications;
  if (msg.includes("github")) return chatbotAnswers.github;
  if (msg.includes("linkedin")) return chatbotAnswers.linkedin;
  if (msg.includes("contact") || msg.includes("email"))
    return chatbotAnswers.contact;

  return chatbotAnswers.fallback;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm Anusha's assistant. How may I help you?"
    }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getReply(input) };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <div className="chatbotIcon" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {open && (
        <div className="chatbotBox">
          <div className="chatbotHeader">
            Portfolio Bot
            <span className="chatbotClose" onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="chatbotMessages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatMsg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbotInput">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about skills, projects..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
