import React, { useState } from "react";
import ChatResponse from "./components/ChatResponse";
import { useSendMessage } from "./hooks";

function App() {

  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");


  const { isLoading, responseMessage: chatResponse } = useSendMessage({ message: chatMessage });



  const sendMessage = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (message == "")
      return;

    setChatMessage(message);
    setMessage("");
  };

  return (
    <div className="app container my-6 mx-auto">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-primary-text">Chatbot UI</h3>
        <div className="flex flex-row">
          <input
            className="p-4 bg-gray-100 flex-1"
            placeholder="Type a message to send"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            className={`px-8 py-4 ${isLoading ? "bg-light-primary" : "bg-primary"}`}
            onClick={(e) => sendMessage(e)}
            disabled={isLoading}
          >
            {isLoading ? "Sending" : "Send"}
          </button>
        </div>
        <div className="flex-row flex-auto">
          <ChatResponse message={chatMessage} response={chatResponse} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
