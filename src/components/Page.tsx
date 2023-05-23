import React from "react";
import { ErrorMessage, FlexCol, LoadingMessage, PageHeading } from ".";

type Props = {
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: Error | null;
  children?: React.ReactNode;
  className?: string;
};

export const Page = ({ title, description, isLoading, error, children, className = "" }: Props) => {

  return (
    <FlexCol className={`p-4 mb-8 container mx-auto max-w-7xl ${className}`}>
      { error && <ErrorMessage error={error} />}
      { title && <PageHeading title={title} description={description} /> }
      { (isLoading) && <LoadingMessage />}
      { !isLoading && children }
    </FlexCol>
  );
};
