import React from "react";

type Props = {
  text: string;
  className?: string;
};

export const Badge = ({ text, className = `` }: Props) => {
  return (
    <div className={`
      inline-block
      px-2
      text-xs
      font-semibold
      leading-6
      bg-orange-600
      text-white
      rounded-full
      self-center
      h-6
      ${ className && className }`}>
      {text}
    </div>
  );
};
