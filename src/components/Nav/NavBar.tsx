import React from "react";
import { FlexCol, FlexRow } from "..";

type Props = {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal"
};

const NavBar = ({ children, direction = "horizontal" }: Props) => {
  if (direction == "vertical") {
    return (
      <FlexCol className="place-content-evenly bg-primary text-primary-text font-bold">
        { children }
      </FlexCol>
    );
  }

  return (
    <FlexRow id="nav-bar" className="place-content-evenly bg-primary text-primary-text font-bold">
      { children }
    </FlexRow>
  );
};

export { NavBar };
