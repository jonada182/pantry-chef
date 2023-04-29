import React from "react";
import { FlexCol } from "./FlexCol";
import { formatHTML } from "../helpers";

type Props = {
  title?: string;
  description?: string;
  isHTML?: boolean;
  children?: React.ReactNode;
};

export const Card = ({ title, description, isHTML = false, children }: Props) => {
  return (
    <FlexCol className="p-4 rounded my-4 bg-white shadow-md border-gray-100 border border-solid" gap={4}>
      { title && (
        <h3 className="text-lg font-bold text-primary-text">{ title }</h3>
      )}
      { description && !isHTML && <div className="text-gray-600 text">{ description }</div>}
      { description && isHTML && <div className="text-gray-600 text" dangerouslySetInnerHTML={{ __html: formatHTML(description) }}></div>}
      { children }
    </FlexCol>
  );
};
