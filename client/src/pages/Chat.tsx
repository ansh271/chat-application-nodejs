import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setMessages, addMessage } from "../store/chat-slice";
import { sendMessage, getMessages } from "../services/chatService";

const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, receiverId, messages } = useSelector((state: RootState) => state.chat);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!receiverId) return;

    const fetchData = async () => {
      try {
        const data = await getMessages(receiverId);
        dispatch(setMessages(data));
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchData();
  }, [receiverId, dispatch]);

  const handleSend = async () => {
    if (!input.trim() || !receiverId) return;
    try {
      const msg = await sendMessage(receiverId, input);
      dispatch(addMessage(msg));
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">💬 Chat App</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2">
        <div className="flex-1 overflow-y-auto max-h-80 border p-2 rounded">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={`p-1 ${
                msg.sender === user?.id ? "text-right text-blue-700" : "text-left text-gray-700"
              }`}
            >
              {msg.sender === user?.id ? `Me: ${msg.message}` : `Friend: ${msg.message}`}
            </p>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
