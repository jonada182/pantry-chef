import React from "react";
import { FlexCol, PageHeading } from "../components";

const Home = () => {
  return (
    <FlexCol>
      <PageHeading
        title="Welcome"
        description="Find recipes, create grocery lists, and more in one place."
      />
    </FlexCol>
  );
};

export { Home };
