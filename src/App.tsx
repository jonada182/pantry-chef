import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, Groceries, Home, Recipes } from "./pages";
import { FlexCol, NavBar, NavBarLink } from "./components";

const App = () => {
  return (
    <div className="app w-full h-full">
      <BrowserRouter>
        <FlexCol className="h-full">
          <NavBar>
            <NavBarLink title="Home" url="/"/>
            <NavBarLink title="Groceries" url="/groceries"/>
            <NavBarLink title="Recipes" url="/recipes"/>
          </NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groceries" element={<Groceries />} errorElement={<ErrorPage />} />
            <Route path="/recipes" element={<Recipes />} errorElement={<ErrorPage />} />
          </Routes>
        </FlexCol>
      </BrowserRouter>
    </div>
  );
};

export default App;
