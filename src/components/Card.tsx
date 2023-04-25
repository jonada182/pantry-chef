import React from "react";
import { FlexCol } from "./FlexCol";

type Props = {
  children?: React.ReactNode;
};

export const Card = ({ children }: Props) => {
  return (
    <FlexCol className="p-4 rounded my-4 bg-white shadow-md border-gray-100 border border-solid text-lg text-primary-text" gap={4}>
      { children }
    </FlexCol>
  );
};
