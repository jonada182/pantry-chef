import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  url: string;
  icon?: ReactNode | null;
};

const NavBarLink = ({ title, url, icon }: Props) => {
  return (
    <NavLink
      className="flex flex-grow p-4 justify-center border-b-4 border-solid border-dark-primary hover:bg-dark-primary"
      title={ title }
      to={ url }

    >
      { icon ? icon : title }
    </NavLink>
  );
};

export { NavBarLink };
