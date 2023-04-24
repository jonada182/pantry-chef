import React from "react";
import { useLocation } from "react-router-dom";
import { Page } from "../components";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <Page>There was an error when loading {location.pathname}</Page>
  );
};

export { ErrorPage };
