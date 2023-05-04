import React from "react";
import { ErrorMessage, FlexCol, LoadingMessage, PageHeading } from ".";

type Props = {
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  children?: React.ReactNode;
};

export const Page = ({ title, description, isLoading, error, children }: Props) => {
  return (
    <FlexCol className="p-4 mb-8 container mx-auto">
      { error && <ErrorMessage error={error} />}
      { title && <PageHeading title={title} description={description} /> }
      { isLoading && <LoadingMessage />}
      { !isLoading && children }
    </FlexCol>
  );
};
