import DashboardPage from "./home/DashboardPage";
import CreditOverview from './creditandbilling/CreditOverview'
import Layout from "./Layout";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import CreditAndConsumption from "./creditandbilling/CreditAndConsumption";
import BillingAndHistory from "./creditandbilling/BillingAndHistory";
import AccessAndSettings from "./accessandsettings/AccessAndSettings";
import StartNewVerification from "./guestverification/StartNewVerification";
import MisReports from "./guestverification/MisReports";
import GuestPhoneEntry from "./guestverification/GuestPhoneEntry";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/creditoverview" element={<ProtectedRoute element={<CreditOverview />} />} />
        <Route path="/creditconsumption" element={<ProtectedRoute element={<CreditAndConsumption />} />} />
        <Route path="/billinghistory" element={<ProtectedRoute element={<BillingAndHistory />} />} />
        <Route path="/accesssettings" element={<ProtectedRoute element={<AccessAndSettings />} />} />
        <Route path="/reservation-entry" element={<ProtectedRoute element={<StartNewVerification />} />} />
        <Route path="/guest-phone-entry" element={<ProtectedRoute element={<GuestPhoneEntry />} />} />
        <Route path="/mis-report" element={<ProtectedRoute element={<MisReports />} />} />
      </Route>

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
