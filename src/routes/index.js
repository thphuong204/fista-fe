import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import WalletPage from "../pages/WalletPage";
import CategoryPage from "../pages/CategoryPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import AccountPage from "../pages/AccountPage";
import RegisterPage from "../pages/RegisterPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="transs/" element={<HomePage />} />
        <Route path="wallets/" element={<WalletPage />} />
        <Route path="categories/" element={<CategoryPage />} />
        <Route path="users/" element={<AccountPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;