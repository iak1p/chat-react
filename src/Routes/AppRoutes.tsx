import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Authorisation from "../pages/Authorisation/Authorisation";
import ChatPage from "../pages/ChatPage/ChatPage";
import Registration from "../pages/RegistrationPage/Registration";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/registration"
        element={localStorage.getItem("uid") ? <Navigate to="/chat" /> : <Registration />}
      />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/authorisation" element={<Authorisation />} />
      <Route path="/" element={<Navigate replace to="/authorisation" />} />
    </Routes>
  );
}

export default AppRoutes;
