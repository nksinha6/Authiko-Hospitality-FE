import HomePage from "./home/HomePage";
import DashboardPage from "./home/DashboardPage";
import BookingsPage from "./bookings/BookingsPage";
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/bookings" element={<ProtectedRoute element={<BookingsPage />} />} />
      </Route>

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
