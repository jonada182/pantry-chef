import React, { useState } from "react";
import { useSendMessage } from "./hooks";
import { PageHeading, TextInput, Button, FlexRow, FlexCol, Chat } from "./components";

function App() {

  const [message, setMessage] = useState("");

  const { isLoading, responseMessage: chatResponse, requestMessage, error, sendMessage } = useSendMessage();

  const handleSendMessageBtn = (event: React.MouseEvent) => {
    event.stopPropagation();
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="app container p-4 mx-auto">
      <FlexCol gap={4}>
      <PageHeading title="Chatbot UI"/>
        <FlexRow gap={1}>
          <TextInput value={message} isLoading={isLoading} handleOnChange={setMessage}/>
          <Button text="Send" loadingText="Sending" isLoading={isLoading} handleOnClick={handleSendMessageBtn} />
        </FlexRow>
        <Chat message={requestMessage} response={chatResponse} loading={isLoading} error={error} />
      </FlexCol>
    </div>
  );
}

export default App;
