import { FlexCol } from "../FlexCol";
import { ThemeName } from "./types";
import { getTheme } from "./themes";
import DOMPurify from "dompurify";

type Props = {
  themeName: ThemeName;
  author: "Me" | "Bot";
  message: string;
  isHTML?: boolean;
};

export function ChatMessage({ themeName, author, message, isHTML }: Props) {

  const theme = getTheme(themeName);
  const safeMessageHTML = DOMPurify.sanitize(message, {
    ALLOWED_TAGS: ["br"],
  });

  return (
    <FlexCol className={`p-4 rounded ${theme.backgroundColour} ${theme.textColour}`}>
      <strong
        className={`font-bold capitalize ${theme.roleColour}`}>
        {author}
      </strong>
      { isHTML ? (
      <span
        className={`italic ${theme.animation}`}
        dangerouslySetInnerHTML={{ __html: safeMessageHTML }}></span>
      ) : (
        <span className={`italic ${theme.animation}`}>
          {message}
        </span>
      )}
    </FlexCol>
  );
}
