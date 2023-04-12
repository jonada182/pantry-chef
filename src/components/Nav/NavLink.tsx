import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  url: string;
};

const NavLink = ({ title, url }: Props) => {
  return (
    <Link className="flex flex-grow p-4 justify-center hover:bg-dark-primary" title={ title } to={ url }>{ title }</Link>
  );
};

export { NavLink };
