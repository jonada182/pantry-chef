import React from "react";
import { gapSizes } from "../helpers";

type Props = {
  children?: React.ReactNode;
  className?: string;
  gap?: number;
};

export function FlexCol({ children, className = ``, gap = 0 }: Props) {
  const gapClass = gapSizes[gap];
  return (
    <div className={`flex flex-col ${gapClass} ${className}`}>{ children }</div>
  );
}
