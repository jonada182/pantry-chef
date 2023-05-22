import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Chat, ErrorPage, Groceries, Home, LoadingPage, Login, Recipes } from "./pages";
import { FlexCol, NavBar, NavBarLink } from "./components";
import { MessageSquare } from "react-feather";
import { AuthContext } from "./AuthContext";

const App = () => {
  const { userId } = useContext(AuthContext);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (userId) {
      setInitialLoading(false);
    }
  }, [userId]);

  if (initialLoading) {
    return <LoadingPage message="Loading user information..." />;
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <FlexCol className="app flex-grow h-screen">
      <FlexCol className="h-full">
        { userId && !isLoginPage && (
          <NavBar >
            <NavBarLink title="Home" url="/" />
            <NavBarLink title="Groceries" url="/groceries" />
            <NavBarLink title="Recipes" url="/recipes" />
            <NavBarLink title="Chat" icon={<MessageSquare />} url="/chat" />
          </NavBar>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index={true} path="/" element={<Home userId={userId} />} />
          <Route path="/groceries" element={<Groceries userId={userId} />} errorElement={<ErrorPage />} />
          <Route path="/recipes" element={<Recipes userId={userId} />} errorElement={<ErrorPage />} />
          <Route path="/chat" element={<Chat />} errorElement={<ErrorPage />} />
        </Routes>
      </FlexCol>
    </FlexCol>
  );
};

export default App;
