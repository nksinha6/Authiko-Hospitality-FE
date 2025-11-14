import React, { useState, useRef, useEffect } from "react";
import { Bell, HelpCircle, Search, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header({ onSidebarToggle }) {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Search Bar and Sidebar Toggle (Mobile) */}
        <div className="flex items-center gap-2 flex-shrink-0 w-auto">
          <div className="relative w-100 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={onSidebarToggle}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ☰
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Section - Icons and User Menu */}
        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <button
            className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="User Menu"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {(user && user.charAt(0).toUpperCase()) || "U"}
              </div>
            </button>

            {/* User Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 text-center border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                    {(user && user.charAt(0).toUpperCase()) || "U"}
                  </div>
                  <div className="font-semibold text-gray-900 capitalize">
                    {user || "Name"}
                  </div>
                  <div className="text-sm text-gray-600 capitalize">
                    {role || "Unit Admin"}
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}