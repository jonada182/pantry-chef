import { FlexCol } from "../FlexCol";
import { ChatMessage } from "./ChatMessage";
import { ThemeSlug } from "./types";

interface Props {
  message: string;
  response: string;
  loading: boolean;
}

export const Chat = ({ message, response, loading }: Props) => {

  return (
    <FlexCol>
      { loading && <ChatMessage themeName={ThemeSlug.NEUTRAL} author={"Bot"} message={"typing..."} />}
      { response != "" && !loading && (
        <FlexCol gap={4}>
          <ChatMessage themeName={ThemeSlug.PRIMARY} author={"Me"} message={message} />
          <ChatMessage themeName={ThemeSlug.SECONDARY} author={"Bot"} isHTML={true} message={response} />
        </FlexCol>
      )}
    </FlexCol>
  );
};
