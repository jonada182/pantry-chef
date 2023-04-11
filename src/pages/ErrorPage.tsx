import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <div>There was an error when loading {location.pathname}</div>
  );
};

export { ErrorPage };
