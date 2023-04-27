import React from "react";
import Cooking from "../assets/img/cooking.png";
import { FlexRow } from "./";

export const LoadingMessage = () => {
  return (
    <FlexRow gap={4} className="content-center justify-center items-center p-4 my-4 animate-pulse">
      {/* <Activity className="text-gray-600 opacity-50 w-9 h-9 animate-spin-slow" /> */}
      <img src={Cooking} className="w-12 aspect-auto opacity-50" alt="Loading..." />
      <h4 className="font-bold text-lg text-gray-600">Loading something amazing...</h4>
    </FlexRow>
  );
};
