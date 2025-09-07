const Chat = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ul>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
            John Doe
          </li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
            Jane Smith
          </li>
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Example message */}
          <div className="bg-blue-100 text-blue-800 p-2 rounded mb-2 w-fit">
            Hello! This is a message.
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
