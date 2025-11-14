import React, { useState } from "react";
import {
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  DollarSign,
  Home,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../../App.css";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dashboard Stats
  const stats = [
    {
      icon: Home,
      label: "Total Rooms",
      value: "250",
      color: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Guests Today",
      value: "48",
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Calendar,
      label: "Bookings",
      value: "156",
      color: "from-green-600 to-teal-600",
      bgColor: "bg-green-50",
    },
    {
      icon: DollarSign,
      label: "Revenue Today",
      value: "$8,240",
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Recent Bookings
  const recentBookings = [
    {
      id: 1,
      guestName: "Alice Johnson",
      roomNumber: "301",
      checkIn: "2025-11-13",
      checkOut: "2025-11-16",
      status: "checked-in",
    },
    {
      id: 2,
      guestName: "Bob Smith",
      roomNumber: "205",
      checkIn: "2025-11-14",
      checkOut: "2025-11-17",
      status: "pending",
    },
    {
      id: 3,
      guestName: "Carol White",
      roomNumber: "412",
      checkIn: "2025-11-15",
      checkOut: "2025-11-18",
      status: "pending",
    },
    {
      id: 4,
      guestName: "David Brown",
      roomNumber: "501",
      checkIn: "2025-11-12",
      checkOut: "2025-11-13",
      status: "checked-out",
    },
  ];

  // Room Status
  const roomStatus = [
    { label: "Available", count: 85, color: "bg-green-500" },
    { label: "Occupied", count: 120, color: "bg-blue-500" },
    { label: "Maintenance", count: 25, color: "bg-yellow-500" },
    { label: "Reserved", count: 20, color: "bg-purple-500" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "checked-out":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "checked-in":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "checked-out":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300`}
        style={{ marginLeft: sidebarOpen ? 265 : 0 }}
      >
        {/* Header - Fixed at top */}
        <Header
          title="Dashboard"
          subtitle="Welcome back, monitor your hotel operations at a glance"
          onSidebarToggle={() => setSidebarOpen((s) => !s)}
        />

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Guest Name
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Room
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Check-In
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Check-Out
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-4 py-4 font-medium text-gray-900">
                            {booking.guestName}
                          </td>
                          <td className="px-4 py-4 text-gray-600">{booking.roomNumber}</td>
                          <td className="px-4 py-4 text-gray-600">{booking.checkIn}</td>
                          <td className="px-4 py-4 text-gray-600">{booking.checkOut}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Room Status */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Room Status</h2>
                <div className="space-y-4">
                  {roomStatus.map((status, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {status.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {status.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${status.color} h-2 rounded-full`}
                          style={{ width: `${(status.count / 250) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Occupancy Rate</span>
                      <span className="font-bold text-gray-900">48%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Stay</span>
                      <span className="font-bold text-gray-900">3.2 nights</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="font-bold text-gray-900">$245K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}