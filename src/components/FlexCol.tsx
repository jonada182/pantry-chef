import React from "react";

type Props = {
  gapSize?: number;
  children?: React.ReactNode;
  className?: string;
};

export function FlexCol({ gapSize, children, className }: Props) {
  return (
    <div className={`flex flex-col gap-${gapSize} ${className}`}>{ children }</div>
  );
}
