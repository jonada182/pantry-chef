import React from "react";
import Cooking from "../assets/img/cooking.png";
import { FlexRow } from "./";

type Props = {
  message?: string;
};

export const LoadingMessage = ({ message }: Props) => {
  return (
    <FlexRow gap={4} className="content-center justify-center items-center p-4 my-4 animate-pulse">
      <img src={Cooking} className="w-12 aspect-auto opacity-50" alt="Loading..." />
      <h4 className="font-bold text-lg text-gray-600">{ message ?? "Loading something amazing..." }</h4>
    </FlexRow>
  );
};
