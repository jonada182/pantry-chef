import React, { useState } from "react";
import { useSendMessage } from "./hooks";
import { PageHeading, TextInput, Button, FlexRow, FlexCol, ChatResponse } from "./components";

function App() {

  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const { isLoading, responseMessage: chatResponse } = useSendMessage({ message: chatMessage });

  const handleSendMessageBtn = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (message == "")
      return;

    setChatMessage(message);
    setMessage("");
  };

  return (
    <div className="app container p-4 mx-auto">
      <FlexCol gapSize={4}>
      <PageHeading title="Chatbot UI"/>
        <FlexRow gapSize={1}>
          <TextInput value={message} isLoading={isLoading} handleOnChange={setMessage}/>
          <Button text="Send" loadingText="Sending" isLoading={isLoading} handleOnClick={handleSendMessageBtn} />
        </FlexRow>
        <ChatResponse message={chatMessage} response={chatResponse} loading={isLoading} />
      </FlexCol>
    </div>
  );
}

export default App;
