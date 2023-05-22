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
    <div className="bg-primary text-primary-text font-bold">
      <div className="max-w-7xl mx-auto">
        <FlexRow id="nav-bar" className="justify-between">
          { children }
        </FlexRow>
      </div>
    </div>
  );
};

export { NavBar };
