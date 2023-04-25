import React from "react";
import { Button, Card, Page, PageHeading } from "../components";

const Home = () => {
  return (
    <Page>
      <PageHeading
        title="Welcome"
        description="Find recipes, create grocery lists, and more in one place."
      />
      <Card>
        TODO: select a meat (if any available)
      </Card>
      <Card>
        TODO: select some vegetables (if any available)
      </Card>
      <Card>
        TODO: select additional products (if any available)
      </Card>
      <Button handleOnClick={() => console.log("Find recipe")} text="Find me a recipe"/>
    </Page>
  );
};

export { Home };
