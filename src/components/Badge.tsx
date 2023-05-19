import React from "react";

type Props = {
  text: string;
  className?: string;
};

export const Badge = ({ text, className = `` }: Props) => {
  return (
    <div className={`
      inline-block
      text-xs
      font-semibold
      leading-5
      bg-orange-600
      text-white
      rounded-full
      self-center
      h-5 w-5 content-center text-center
      ${ className && className }`}>
      {text}
    </div>
  );
};
