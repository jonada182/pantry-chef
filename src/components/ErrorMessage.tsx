import React from "react";
import { AlertCircle } from "react-feather";
import { FlexCol, FlexRow } from "./";

type Props = {
  error: Error;
};

export const ErrorMessage = ({ error }: Props) => {
  return (
    <FlexRow gap={4} className="content-center align-middle items-center bg-red-50 border border-red-200 p-4 rounded-full my-4">
      <AlertCircle className="text-red-600 opacity-50 w-12 h-12" />
      <FlexCol>
      <h4 className="font-bold text-lg text-red-900">Something went wrong</h4>
      <p className="text-sm text-secondary-text">{error.message}</p>
      </FlexCol>
    </FlexRow>
  );
};
