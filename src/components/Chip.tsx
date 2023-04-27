import React from "react";
import { Check } from "react-feather";

type Props = {
  name: string;
  isSelected?: boolean | false;
  handleOnClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Chip = ({ name, isSelected, handleOnClick }: Props) => {
  return (
    <div
      className={`inline-block align-middle ${ isSelected ? "bg-yellow-500" : "bg-gray-800"} text-white text-sm leading-4 px-4 py-2 cursor-pointer rounded-full mr-1 mb-1`}
      onClick={(e) => handleOnClick && handleOnClick(e)}
    >
      <div className="flex flex-row justify-center items-center content-center align-middle">
        { isSelected && <Check className="inline-block align-middle box-content w-4 h-4 mr-1"/>}
        { name }
      </div>
    </div>
  );
};
