import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import WalletPage from "../pages/WalletPage";
import CategoryPage from "../pages/CategoryPage";
import ReportPage from "../pages/ReportPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import WalletDetails from "../components/WalletDetails";

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
        <Route path="wallets/:id" element={<WalletDetails />} />
        <Route path="categories/" element={<CategoryPage />} />
        <Route path="report/" element={<ReportPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;