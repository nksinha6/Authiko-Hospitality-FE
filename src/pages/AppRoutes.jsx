import HomePage from "./home/HomePage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      </Route>

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
