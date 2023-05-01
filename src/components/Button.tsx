import React from "react";

type Props = {
  text: string;
  isSmall?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  isCentered?: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function Button({ text, isSmall, loadingText = "Loading...", isLoading, isCentered, handleOnClick, className }: Props) {
  return (
    <button
      type="button"
      className={`
        ${ isSmall ? `text-sm px-4 py-2` : `px-6 py-3`}
        ${isLoading ? "bg-light-primary" : "bg-primary"}
        rounded-full
        font-bold
        max-w-xs
        ${ isCentered ? `place-self-center` : "place-self-start"}
        ${ className && className }
      `}
      onClick={(e) => handleOnClick(e)}
      disabled={isLoading}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
