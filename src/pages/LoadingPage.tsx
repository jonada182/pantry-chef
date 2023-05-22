import React from "react";
import { FlexCol, LoadingMessage, Page } from "../components";

type Props = {
  message?: string;
};

const LoadingPage = ({ message }: Props) => {
  return (
    <FlexCol className="app flex-grow h-screen">
      <FlexCol className="h-full">
        <Page className="justify-center max-w-lg">
          <LoadingMessage message={ message } />
        </Page>
      </FlexCol>
    </FlexCol>
  );
};

export { LoadingPage };
