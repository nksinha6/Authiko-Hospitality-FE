import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  Home,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Sidebar({ show, onClose, isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  // support both mobile props (show/onClose) and desktop (isOpen/setIsOpen)
  const visible = typeof isOpen !== "undefined" ? isOpen : show;
  
  const [openCreditBilling, setOpenCreditBilling] = useState(false);
  const [openAccessSettings, setOpenAccessSettings] = useState(false);
  const [openGuestVerification, setOpenGuestVerification] = useState(false);

  // Keep dropdown open when user navigates directly to related pages
  useEffect(() => {
    if (
      location.pathname === "/creditoverview" ||
      location.pathname === "/creditconsumption" ||
      location.pathname === "/billinghistory"
    ) {
      setOpenCreditBilling(true);
      setOpenAccessSettings(false);
      setOpenGuestVerification(false);
    } else if (location.pathname === "/accesssettings") {
      setOpenAccessSettings(true);
      setOpenCreditBilling(false);
      setOpenGuestVerification(false);
    } else if (
      location.pathname === "/reservation-entry" ||
      location.pathname === "/mis-report"
    ) {
      setOpenGuestVerification(true);
      setOpenCreditBilling(false);
      setOpenAccessSettings(false);
    } else if (location.pathname === "/" || location.pathname === "/dashboard") {
      setOpenCreditBilling(false);
      setOpenAccessSettings(false);
      setOpenGuestVerification(false);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (typeof setIsOpen === "function") setIsOpen(false);
    if (typeof onClose === "function") onClose();
  };

  // Close all dropdowns
  const closeAll = () => {
    setOpenCreditBilling(false);
    setOpenAccessSettings(false);
    setOpenGuestVerification(false);
  };

  // Toggle handlers ensuring only one open at a time
  const toggleCreditBilling = () => {
    setOpenCreditBilling((prev) => {
      const newState = !prev;
      if (newState) {
        setOpenAccessSettings(false);
        setOpenGuestVerification(false);
      }
      return newState;
    });
    // ensure desktop sidebar remains open if provided
    if (typeof setIsOpen === "function" && visible) setIsOpen(true);
  };

  const toggleAccessSettings = () => {
    setOpenAccessSettings((prev) => {
      const newState = !prev;
      if (newState) {
        setOpenCreditBilling(false);
        setOpenGuestVerification(false);
      }
      return newState;
    });
  };

  const toggleGuestVerification = () => {
    setOpenGuestVerification((prev) => {
      const newState = !prev;
      if (newState) {
        setOpenCreditBilling(false);
        setOpenAccessSettings(false);
      }
      return newState;
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 overflow-y-auto ${
        visible ? "block" : "hidden md:block"
      }`}
      style={{
        width: "265px",
      }}
    >
      {/* Close button for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => {
          if (typeof onClose === "function") onClose();
          if (typeof setIsOpen === "function") setIsOpen(false);
        }}
      >
        ✕
      </button>

      {/* Logo Section */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <h1 className="text-xl font-bold text-gray-900">Authiko</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {/* Dashboard */}
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          onClick={closeAll}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium mb-1 ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        {/* Credit & Billing Dropdown */}
        <div className="mb-1">
          <button
            onClick={toggleCreditBilling}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              openCreditBilling || 
              location.pathname === "/creditoverview" ||
              location.pathname === "/creditconsumption" ||
              location.pathname === "/billinghistory"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            type="button"
            aria-expanded={openCreditBilling}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 flex-shrink-0" />
              <span>Credit & Billing</span>
            </div>
            {openCreditBilling ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Credit & Billing Sub-menu */}
          {openCreditBilling && (
            <div className="ml-7 mt-1 space-y-1">
              <NavLink
                to="/creditoverview"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <DollarSign className="w-3.5 h-3.5" />
                Credit Overview
              </NavLink>

              <NavLink
                to="/creditconsumption"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <FileText className="w-3.5 h-3.5" />
                Credit Consumption
              </NavLink>

              <NavLink
                to="/billinghistory"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <FileText className="w-3.5 h-3.5" />
                Billing History
              </NavLink>
            </div>
          )}
        </div>

        {/* Access & Settings Dropdown */}
        <div className="mb-1">
          <button
            onClick={toggleAccessSettings}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              openAccessSettings || location.pathname === "/accesssettings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            type="button"
            aria-expanded={openAccessSettings}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span>Access & Settings</span>
            </div>
            {openAccessSettings ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Access & Settings Sub-menu */}
          {openAccessSettings && (
            <div className="ml-7 mt-1 space-y-1">
              <NavLink
                to="/accesssettings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Access & Settings
              </NavLink>
            </div>
          )}
        </div>

        {/* Guest Verification Dropdown */}
        <div className="mb-1">
          <button
            onClick={toggleGuestVerification}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              openGuestVerification ||
              location.pathname === "/reservation-entry" ||
              location.pathname === "/mis-report"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            type="button"
            aria-expanded={openGuestVerification}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>Guest Verification</span>
            </div>
            {openGuestVerification ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Guest Verification Sub-menu */}
          {openGuestVerification && (
            <div className="ml-7 mt-1 space-y-1">
              <NavLink
                to="/reservation-entry"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Calendar className="w-3.5 h-3.5" />
                Start New Verification
              </NavLink>

              <NavLink
                to="/mis-report"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <FileText className="w-3.5 h-3.5" />
                MIS Reports
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}