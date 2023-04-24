import React from "react";
import { FlexCol } from ".";

type Props = {
  children?: React.ReactNode;
};

export const Page = ({ children }: Props) => {
  return (
    <FlexCol className="p-4 h-full">{ children }</FlexCol>
  );
};
