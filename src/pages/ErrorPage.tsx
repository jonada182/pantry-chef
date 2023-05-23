import React from "react";
import { useLocation } from "react-router-dom";
import { FlexCol, Page } from "../components";

type Props = {
  error?: Error | null;
};

const ErrorPage = ({ error }: Props) => {
  const location = useLocation();

  return (
    <FlexCol className="app flex-grow h-screen">
      <FlexCol className="h-full">
        <Page error={error ?? new Error(`There was an error when loading ${location.pathname}`)} />
      </FlexCol>
    </FlexCol>
  );
};

export { ErrorPage };
