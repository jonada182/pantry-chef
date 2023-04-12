import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, Groceries, Home, Recipes } from "./pages";
import { FlexCol, Nav, NavLink } from "./components";

function App() {

  return (
    <div className="app w-full h-full">
      <BrowserRouter>
        <FlexCol>
          <Nav>
            <NavLink title="Home" url="/"/>
            <NavLink title="Recipes" url="/recipes"/>
            <NavLink title="Groceries" url="/groceries"/>
          </Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groceries" element={<Groceries />} errorElement={<ErrorPage />} />
            <Route path="/recipes" element={<Recipes />} errorElement={<ErrorPage />} />
          </Routes>
        </FlexCol>
      </BrowserRouter>
    </div>
  );
}

export default App;
