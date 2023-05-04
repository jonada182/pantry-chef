import React from "react";
import { FlexCol } from "./FlexCol";

type Props = {
  title: string;
  description?: string;
};

export function PageHeading({ title, description }: Props) {
  return (
    <FlexCol gap={4} className="my-4">
      <h3 className="text-2xl font-bold text-primary-text">
      {title}
    </h3>
    { description && <p className="text-lg text-secondary-text">{ description }</p> }
    </FlexCol>
  );
}
