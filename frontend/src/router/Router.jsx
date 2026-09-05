import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "../components/PrivateRoute";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/pageNotFound";

function Router() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
