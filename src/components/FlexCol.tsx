import React from "react";
import { gapSizes } from "../helpers";

type Props = {
  id?: string | "";
  children?: React.ReactNode;
  className?: string;
  gap?: number;
};

export function FlexCol({ id, children, className = ``, gap = 0 }: Props) {
  const gapClass = gapSizes[gap];
  return (
    <div id={id} className={`flex flex-col ${gapClass} ${className}`}>{ children }</div>
  );
}
