import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Plus,
  Users,
  Bed,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  FileText,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CommonTable from "../components/commontable/CommonTable";
import DateFilter from "../components/datehourfilter/DateFilter";

const MisReports = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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
      paymentMode: "Credit Card",
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
      paymentMode: "UPI",
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
      paymentMode: "Bank Transfer",
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
      paymentMode: "Credit Card",
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
      paymentMode: "UPI",
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
      paymentMode: "Credit Card",
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
      paymentMode: "Bank Transfer",
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
      paymentMode: "UPI",
    },
  ]);

  // Calculate booking summary
  const totalBookings = bookings.length;
  const checkedInBookings = bookings.filter(b => b.status === "checked-in").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  // Booking summary KPIs
  const bookingKPIs = [
    {
      icon: FileText,
      title: "Total Bookings",
      value: totalBookings.toString(),
      color: "from-blue-600 to-cyan-600",
      description: "All bookings in system",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: Users,
      title: "Checked In",
      value: checkedInBookings.toString(),
      color: "from-green-600 to-teal-600",
      description: "Currently staying guests",
      trend: "+5%",
      trendUp: true,
    },
    {
      icon: Clock,
      title: "Pending Check-ins",
      value: pendingBookings.toString(),
      color: "from-orange-600 to-red-600",
      description: "Upcoming arrivals",
      trend: "+8%",
      trendUp: true,
    },
    {
      icon: DollarSign,
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      color: "from-purple-600 to-pink-600",
      description: "Total booking value",
      trend: "+15%",
      trendUp: true,
    },
  ];

  // Room type distribution
  const roomTypeStats = [
    {
      icon: Bed,
      title: "Deluxe Rooms",
      value: bookings.filter(b => b.roomType === "Deluxe").length.toString(),
      color: "blue",
    },
    {
      icon: Bed,
      title: "Standard Rooms",
      value: bookings.filter(b => b.roomType === "Standard").length.toString(),
      color: "green",
    },
    {
      icon: Bed,
      title: "Suite Rooms",
      value: bookings.filter(b => b.roomType === "Suite").length.toString(),
      color: "purple",
    },
  ];

  // Payment mode distribution
  const paymentModeStats = [
    {
      icon: DollarSign,
      title: "Credit Card",
      value: bookings.filter(b => b.paymentMode === "Credit Card").length.toString(),
      color: "blue",
    },
    {
      icon: FileText,
      title: "UPI",
      value: bookings.filter(b => b.paymentMode === "UPI").length.toString(),
      color: "green",
    },
    {
      icon: Calendar,
      title: "Bank Transfer",
      value: bookings.filter(b => b.paymentMode === "Bank Transfer").length.toString(),
      color: "purple",
    },
  ];

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Transform bookings data for CommonTable
  const tableRecords = filteredBookings.map(booking => ({
    ...booking,
    room: `Room ${booking.roomNumber} (${booking.roomType})`,
    totalAmount: `$${booking.totalAmount}`,
    status: booking.status,
  }));

  // Table configuration
  const headers = [
    "Booking ID",
    "Guest Name",
    "Room",
    "Check-In",
    "Check-Out",
    "Nights",
    "Amount",
    "Payment Mode",
    "Status",
    "Actions",
  ];

  const defaultColumns = [
    { key: "id", label: "Booking ID" },
    { key: "guestName", label: "Guest Name" },
    { key: "room", label: "Room" },
    { key: "checkInDate", label: "Check-In" },
    { key: "checkOutDate", label: "Check-Out" },
    { key: "nights", label: "Nights" },
    { key: "totalAmount", label: "Amount" },
    { key: "paymentMode", label: "Payment Mode" },
    {
      key: "status",
      label: "Status",
      render: (record) => {
        const status = record.status;
        let statusConfig = {
          "checked-in": {
            color: "bg-green-100 text-green-800",
            icon: <CheckCircle className="w-4 h-4" />,
            label: "Checked In",
          },
          pending: {
            color: "bg-yellow-100 text-yellow-800",
            icon: <Clock className="w-4 h-4" />,
            label: "Pending",
          },
          "checked-out": {
            color: "bg-gray-100 text-gray-800",
            icon: <AlertCircle className="w-4 h-4" />,
            label: "Checked Out",
          },
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
          >
            {config.icon}
            {config.label}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(record)}
            className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
          >
            <Search className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => handleDownloadInvoice(record)}
            className="flex items-center gap-2 px-3 py-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (booking) => {
    console.log("Viewing details for:", booking.id);
    alert(`Viewing details for booking ${booking.id}`);
  };

  const handleDownloadInvoice = (booking) => {
    console.log("Downloading invoice for:", booking.id);
    alert(`Downloading invoice for booking ${booking.id}`);
  };

  const handleExportData = () => {
    console.log("Exporting booking data");
    alert("Exporting booking data to CSV");
  };

  const handleNewBooking = () => {
    console.log("Creating new booking");
    alert("Opening new booking form");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-[265px] flex flex-col">
        {/* Header */}
        <Header onSidebarToggle={() => setShowSidebar(true)} />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                MIS Reports & Analytics
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Comprehensive management information system for hotel operations and bookings
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {bookingKPIs.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  {/* KPI Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h5 className="text-sm font-semibold text-gray-700">
                      {kpi.title}
                    </h5>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View more
                    </button>
                  </div>

                  {/* KPI Body */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center`}
                        >
                          <kpi.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {kpi.value}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          kpi.trendUp ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {kpi.trendUp ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {kpi.trend}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {kpi.description}
                    </div>

                    {/* Mini Chart Line */}
                    <div className="h-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg mb-3 flex items-end px-1">
                      <div className="flex items-end justify-between w-full h-full py-1">
                        {[30, 50, 40, 70, 60, 80, 90].map((height, i) => (
                          <div
                            key={i}
                            className={`w-1 bg-gradient-to-t ${kpi.color} rounded-full`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-gray-400">Updated 1:37 PM</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Room Type Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {roomTypeStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Mode Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {paymentModeStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Filters Section */}

              {/* Date Filter */}
              <div className="mt-4">
                <DateFilter records={filteredBookings} />
              </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <CommonTable
                headers={headers}
                records={tableRecords}
                defaultColumns={defaultColumns}
              />
            </div>

            {/* Table Footer Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>

            {/* Booking Status Legend */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-4">
                Booking Status Legend
              </h4>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    Checked In
                  </span>
                  <span className="text-sm text-gray-600">
                    Guest is currently staying
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                  <span className="text-sm text-gray-600">
                    Upcoming reservation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <AlertCircle className="w-4 h-4" />
                    Checked Out
                  </span>
                  <span className="text-sm text-gray-600">
                    Stay completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default MisReports;