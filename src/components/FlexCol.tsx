import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  gap?: number;
};

export function FlexCol({ children, className = ``, gap = 0 }: Props) {
  const gapClass = `gap-${ gap }`;
  return (
    <div className={`flex flex-col ${gapClass} ${className}`}>{ children }</div>
  );
}
