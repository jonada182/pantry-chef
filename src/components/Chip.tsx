import React from "react";

type Props = {
  key?: React.Key | null
  name: string;
  handleOnClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Chip = ({ key, name, handleOnClick }: Props) => {
  return (
    <div
      key={key}
      className="
        inline-block
        bg-gray-600
        text-white
        text-sm
        leading-4
        px-3 py-2
        cursor-pointer
        rounded-full
        mr-1 mb-1
      "
      onClick={(e) => handleOnClick(e)}
    >
      { name }
    </div>
  );
};
