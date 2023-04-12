import React from "react";
import { FlexCol, FlexRow } from "..";

type Props = {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal"
};

const Nav = ({ children, direction = "horizontal" }: Props) => {
  if (direction == "vertical") {
    return (
      <FlexCol className="place-content-evenly bg-primary text-white font-bold">
        { children }
      </FlexCol>
    );
  }

  return (
    <FlexRow className="place-content-evenly bg-primary text-white font-bold">
      { children }
    </FlexRow>
  );
};

export { Nav };
