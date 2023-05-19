import React from "react";
import { FlexCol } from "./FlexCol";
import { formatHTML } from "../helpers";

type Hero = {
  title: string | "";
  imageUrl?: string | null;
};

type Props = {
  title?: string;
  description?: string;
  isHTML?: boolean;
  children?: React.ReactNode;
  hero?: Hero | null;
};

export const Card = ({ title, description, isHTML = false, children, hero }: Props) => {
  return (
    <FlexCol className="rounded-lg my-4 bg-white shadow-md border-gray-100 border border-solid overflow-hidden" gap={4}>
      { hero && (
        <FlexCol className="w-full h-60 relative">
          { hero.imageUrl && <img src={hero.imageUrl} alt={hero.title} className="absolute inset-0 object-cover object-top w-full h-full" />}
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <h1 className="text-3xl font-bold text-white">{hero.title}</h1>
            </div>
          </div>
        </FlexCol>
      )}
      <FlexCol className="p-4" gap={4}>
        { title && (
          <h3 className="text-lg font-bold text-primary-text">{ title }</h3>
        )}
        { description && !isHTML && <div className="text-gray-600 text">{ description }</div>}
        { description && isHTML && <div className="text-primary-text text" dangerouslySetInnerHTML={{ __html: formatHTML(description) }}></div>}
        { children }
      </FlexCol>
    </FlexCol>
  );
};
