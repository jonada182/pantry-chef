import React, { useState } from "react";
import { useSendMessage } from "../hooks";
import { TextInput, Button, FlexRow, ChatContainer, Page } from "../components";

const Chat = () => {

  const [message, setMessage] = useState("");

  const { loading: isLoading, responseMessage: chatResponse, requestMessage, error, sendMessage } = useSendMessage();

  const handleSendMessageBtn = (event: React.MouseEvent) => {
    event.stopPropagation();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Page
      isLoading={isLoading}
      title="Chatbot"
      description="How can I help you today?"
    >
      <FlexRow gap={2} className="mb-4">
        <TextInput value={message} placeholder="Type a message to send" isLoading={isLoading} handleOnChange={setMessage} />
        <Button text="Send" loadingText="Sending" isLoading={isLoading} handleOnClick={handleSendMessageBtn} />
      </FlexRow>
      <ChatContainer message={requestMessage} response={chatResponse} loading={isLoading} error={error} />
    </Page>
  );
};

export { Chat };
