import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Chat, ErrorPage, Groceries, Home, Recipes } from "./pages";
import { FlexCol, NavBar, NavBarLink } from "./components";
import { MessageSquare } from "react-feather";

const App = () => {
  return (
    <FlexCol className="app flex-grow">
      <HashRouter>
        <FlexCol>
          <NavBar>
            <NavBarLink title="Home" url="/"/>
            <NavBarLink title="Groceries" url="/groceries"/>
            <NavBarLink title="Recipes" url="/recipes"/>
            <NavBarLink title="Chat" icon={<MessageSquare/>} url="/chat"/>
          </NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groceries" element={<Groceries />} errorElement={<ErrorPage />} />
            <Route path="/recipes" element={<Recipes />} errorElement={<ErrorPage />} />
            <Route path="/chat" element={<Chat />} errorElement={<ErrorPage />} />
          </Routes>
        </FlexCol>
      </HashRouter>
    </FlexCol>
  );
};

export default App;
