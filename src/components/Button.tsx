import React from "react";

type Props = {
  text: string;
  isSmall?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Button({ text, isSmall, loadingText, isLoading, handleOnClick }: Props) {
  return (
    <button
      className={`
        ${ isSmall ? `text-sm px-4 py-2` : `px-6 py-3`}
        ${isLoading ? "bg-light-primary" : "bg-primary"}
        rounded-full
        font-bold
      `}
      onClick={(e) => handleOnClick(e)}
      disabled={isLoading}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
