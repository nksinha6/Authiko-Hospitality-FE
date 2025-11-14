import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../../App.css";

export default function CreditOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample bookings data
  const [bookings] = useState([
    {
      id: "BK001",
      guestName: "Alice Johnson",
      roomNumber: "301",
      roomType: "Deluxe",
      checkInDate: "2025-11-13",
      checkOutDate: "2025-11-16",
      status: "checked-in",
      nights: 3,
      totalAmount: 450,
      phone: "+1-234-567-8900",
      email: "alice@example.com",
    },
    {
      id: "BK002",
      guestName: "Bob Smith",
      roomNumber: "205",
      roomType: "Standard",
      checkInDate: "2025-11-14",
      checkOutDate: "2025-11-17",
      status: "pending",
      nights: 3,
      totalAmount: 300,
      phone: "+1-234-567-8901",
      email: "bob@example.com",
    },
    {
      id: "BK003",
      guestName: "Carol White",
      roomNumber: "412",
      roomType: "Suite",
      checkInDate: "2025-11-15",
      checkOutDate: "2025-11-18",
      status: "pending",
      nights: 3,
      totalAmount: 600,
      phone: "+1-234-567-8902",
      email: "carol@example.com",
    },
    {
      id: "BK004",
      guestName: "David Brown",
      roomNumber: "501",
      roomType: "Deluxe",
      checkInDate: "2025-11-12",
      checkOutDate: "2025-11-13",
      status: "checked-out",
      nights: 1,
      totalAmount: 150,
      phone: "+1-234-567-8903",
      email: "david@example.com",
    },
    {
      id: "BK005",
      guestName: "Emma Davis",
      roomNumber: "102",
      roomType: "Standard",
      checkInDate: "2025-11-16",
      checkOutDate: "2025-11-20",
      status: "pending",
      nights: 4,
      totalAmount: 400,
      phone: "+1-234-567-8904",
      email: "emma@example.com",
    },
    {
      id: "BK006",
      guestName: "Frank Miller",
      roomNumber: "303",
      roomType: "Deluxe",
      checkInDate: "2025-11-17",
      checkOutDate: "2025-11-19",
      status: "pending",
      nights: 2,
      totalAmount: 300,
      phone: "+1-234-567-8905",
      email: "frank@example.com",
    },
    {
      id: "BK007",
      guestName: "Grace Lee",
      roomNumber: "405",
      roomType: "Suite",
      checkInDate: "2025-11-18",
      checkOutDate: "2025-11-22",
      status: "pending",
      nights: 4,
      totalAmount: 800,
      phone: "+1-234-567-8906",
      email: "grace@example.com",
    },
    {
      id: "BK008",
      guestName: "Henry Wilson",
      roomNumber: "201",
      roomType: "Standard",
      checkInDate: "2025-11-13",
      checkOutDate: "2025-11-15",
      status: "checked-in",
      nights: 2,
      totalAmount: 200,
      phone: "+1-234-567-8907",
      email: "henry@example.com",
    },
  ]);

  // Stats cards data
  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length.toString(),
      color: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
    },
    {
      label: "Checked In",
      value: bookings.filter(b => b.status === "checked-in").length.toString(),
      color: "from-green-600 to-teal-600",
      bgColor: "bg-green-50",
      trend: "+5%",
    },
    {
      label: "Pending",
      value: bookings.filter(b => b.status === "pending").length.toString(),
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50",
      trend: "+8%",
    },
    {
      label: "Total Revenue",
      value: `$${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}`,
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50",
      trend: "+15%",
    },
  ];

  // Filter bookings
  const filtered = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = filtered.slice(startIdx, startIdx + itemsPerPage);

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
          title="Bookings"
          subtitle="Manage and track all guest bookings"
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
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-500 text-sm font-medium">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Bookings Table Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by guest name, room number, or booking ID..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5" />
                      Export
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all">
                      <Plus className="w-5 h-5" />
                      New Booking
                    </button>
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Booking ID
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Guest Name
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Room
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Check-In
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Check-Out
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Nights
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedBookings.length > 0 ? (
                        paginatedBookings.map((booking) => (
                          <tr
                            key={booking.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-semibold text-gray-900">
                                {booking.id}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {booking.guestName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {booking.guestName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {booking.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  Room {booking.roomNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {booking.roomType}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {booking.checkInDate}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {booking.checkOutDate}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                              {booking.nights}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                              ${booking.totalAmount}
                            </td>
                            <td className="px-6 py-4">
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
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button 
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Edit Booking"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <p className="text-gray-500 text-lg mb-2">No bookings found</p>
                              <p className="text-gray-400 text-sm">
                                Try adjusting your search or filter criteria
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Showing {startIdx + 1} to{" "}
                      {Math.min(startIdx + itemsPerPage, filtered.length)} of{" "}
                      {filtered.length} bookings
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}