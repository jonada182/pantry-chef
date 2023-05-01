import React from "react";
import { FlexCol } from "../FlexCol";
import { ChatMessage } from "./ChatMessage";
import { ThemeSlug } from "./types";
import { ErrorMessage } from "../ErrorMessage";

interface Props {
  message: string;
  response: string;
  loading: boolean;
  error?: any;
}

export const ChatContainer = ({ message, response, loading, error }: Props) => {

  return (
    <FlexCol>
      { loading && <ChatMessage themeName={ThemeSlug.NEUTRAL} author={"Bot"} message={"typing..."} />}
      { response != "" && !loading && (
        <FlexCol gap={4}>
          <ChatMessage themeName={ThemeSlug.PRIMARY} author={"Me"} message={message} />
          <ChatMessage themeName={ThemeSlug.SECONDARY} author={"Bot"} isHTML={true} message={response} />
        </FlexCol>
      )}
      { error && <ErrorMessage error={error}/>}
    </FlexCol>
  );
};
