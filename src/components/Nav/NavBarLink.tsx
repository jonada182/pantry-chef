import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  title: string;
  url: string;
};

const NavBarLink = ({ title, url }: Props) => {
  return (
    <NavLink className="flex flex-grow p-4 justify-center border-b-4 border-solid border-dark-primary hover:bg-dark-primary" title={ title } to={ url }>{ title }</NavLink>
  );
};

export { NavBarLink };
