import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ErrorPage, Groceries, Home, Recipes } from "./pages";
import { FlexCol } from "./components";

function App() {

  return (
    <div className="app w-full h-full">
      <BrowserRouter>
        <FlexCol>
          <nav className="p-4 bg-gray-200">
            <ul className="flex flex-row place-content-evenly">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                <Link to="/groceries">Groceries</Link>
              </li>
            </ul>
          </nav>
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
