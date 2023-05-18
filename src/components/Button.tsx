import React from "react";

type Props = {
  text: string;
  isSmall?: boolean;
  loadingText?: string;
  isLoading?: boolean;
  isCentered?: boolean;
  isSecondary?: boolean;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function Button({
  text,
  isSmall,
  loadingText = "Loading...",
  isLoading,
  isCentered,
  isSecondary,
  handleOnClick,
  className = ``,
}: Props) {
  return (
    <button
      type="button"
      className={`
        transition-all duration-500 ease-in-out
        hover:opacity-70
        ${ isSmall ? `text-sm px-4 py-2` : `px-6 py-3`}
        ${isLoading ? "bg-gray-600 text-white" : (isSecondary ? "bg-black text-white" : "bg-primary text-black")}
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
