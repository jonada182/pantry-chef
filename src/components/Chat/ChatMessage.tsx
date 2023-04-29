import { FlexCol } from "../FlexCol";
import { ThemeName } from "./types";
import { getTheme } from "./themes";
import { formatHTML } from "../../helpers";
import React from "react";

type Props = {
  themeName: ThemeName;
  author: "Me" | "Bot";
  message: string;
  isHTML?: boolean;
};

export function ChatMessage({ themeName, author, message, isHTML }: Props) {

  const theme = getTheme(themeName);

  return (
    <FlexCol className={`p-4 rounded ${theme.backgroundColour} ${theme.textColour}`}>
      <strong
        className={`font-bold capitalize ${theme.roleColour}`}>
        {author}
      </strong>
      { isHTML ? (
      <div
        className={`italic my-4 mr-8 ${theme.animation}`}
        dangerouslySetInnerHTML={{ __html: formatHTML(message) }}></div>
      ) : (
        <div className={`italic ${theme.animation}`}>
          {message}
        </div>
      )}
    </FlexCol>
  );
}
