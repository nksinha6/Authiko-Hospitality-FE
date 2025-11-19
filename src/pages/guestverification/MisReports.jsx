import React, { useState } from "react";
import { format } from "date-fns";
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CommonTable from "../components/commontable/CommonTable";
import DateFilter from "../components/datehourfilter/DateFilter";
import { guestRecords } from "../../utils/tableData";
import User1 from "../../assets/images/profile.jpg";

const MisReports = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Checked In");
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Use imported data
  const records = guestRecords;

  // Calculate statistics
  const totalGuests = records.length;
  const verifiedGuests = records.filter(
    (r) => r.aadhaarVerification.status === "Verified"
  ).length;
  const withDependents = records.filter((r) => r.dependents.length > 0).length;
  const totalDependents = records.reduce((sum, r) => sum + r.dependents.length, 0);

  // KPI Cards Data
  const guestKPIs = [
    {
      icon: Users,
      title: "Total Guest Records",
      value: totalGuests.toString(),
      color: "from-blue-600 to-cyan-600",
      description: "All verified guest check-ins",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: UserCheck,
      title: "Aadhaar Verified",
      value: verifiedGuests.toString(),
      color: "from-green-600 to-teal-600",
      description: "Guests verified via Aadhaar",
      trend: "+8%",
      trendUp: true,
    },
    {
      icon: UserX,
      title: "Guests with Dependents",
      value: withDependents.toString(),
      color: "from-purple-600 to-pink-600",
      description: "Guests traveling with family",
      trend: "+5%",
      trendUp: true,
    },
    {
      icon: Users,
      title: "Total Dependents",
      value: totalDependents.toString(),
      color: "from-orange-600 to-red-600",
      description: "Total registered dependents",
      trend: "+15%",
      trendUp: true,
    },
  ];

  // Table configuration
  const headers = [
    "Check-in Date",
    "Property",
    "Reservation",
    "Guest Name",
    "Phone",
    "Verification",
    "",
  ];

  const defaultColumns = [
    { key: "checkIn", label: "Check-in Date" },
    { key: "hotel", label: "Property" },
    { key: "reservation", label: "Reservation" },
    { key: "name", label: "Guest Name" },
    { key: "phone", label: "Phone" },
    { key: "verification", label: "Verification" },
    { key: "details", label: "" },
  ];

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    return `+91-${phone.substring(0, 2)}XXX-XXX${phone.slice(-2)}`;
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
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                MIS Reports
              </h2>
              <p className="text-gray-500 text-sm">
                Verified guest information for law enforcement access
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {guestKPIs.map((kpi, index) => (
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

            {/* Date Filter */}
            <DateFilter records={records} />

            {/* Guest Records Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CommonTable
                headers={headers}
                records={records}
                handleShowDetails={handleShowDetails}
                maskPhone={maskPhone}
                defaultColumns={defaultColumns}
              />
            </div>

            {/* Table Footer Info */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {records.length} of {records.length} guest records
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
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

      {/* Guest Details Modal */}
      {showModal && selectedGuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={User1}
                    alt={selectedGuest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedGuest.name}</h3>
                  <p className="text-blue-100">
                    {selectedGuest.hotel} | {selectedGuest.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Reservation Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Check-in Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {format(new Date(selectedGuest.checkIn), "d MMM yyyy, h:mm a")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Reservation Number</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGuest.reservation}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Property Name</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGuest.hotel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Property Location</p>
                    <p className="font-semibold text-gray-900">
                      {selectedGuest.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-semibold text-gray-900">
                        {selectedGuest.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date of Birth</p>
                      <p className="font-semibold text-gray-900">
                        {selectedGuest.dob}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Nationality</p>
                      <p className="font-semibold text-gray-900">
                        {selectedGuest.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Government ID Type</p>
                      <p className="font-semibold text-gray-900">
                        {selectedGuest.govtIdType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Government ID Number</p>
                      <p className="font-semibold text-gray-900">
                        {selectedGuest.govtIdNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phone Number</p>
                        <p className="font-semibold text-gray-900">
                          {maskPhone(selectedGuest.phone)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">
                          {selectedGuest.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aadhaar Verification & Dependents */}
                <div className="space-y-6">
                  {/* Aadhaar Verification */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Aadhaar Verification
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="font-semibold text-gray-900">
                          {selectedGuest.aadhaarVerification.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Face ID</p>
                        <p className="font-semibold flex items-center gap-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              selectedGuest.aadhaarVerification.faceId === "Match"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          {selectedGuest.aadhaarVerification.faceId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Manual Verification</p>
                        <p className="font-semibold text-gray-900">
                          {selectedGuest.aadhaarVerification.manualVerification}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verified On</p>
                        <p className="font-semibold text-gray-900">
                          {selectedGuest.aadhaarVerification.verifiedOn}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">
                          Verified By (Hotel Staff ID)
                        </p>
                        <p className="font-semibold text-gray-900">
                          {selectedGuest.aadhaarVerification.verifiedBy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dependents Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Dependents Information
                    </h4>
                    {selectedGuest.dependents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedGuest.dependents.map((d, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <p className="font-semibold text-gray-900">
                              Dependent {idx + 1}: {d.name}
                            </p>
                            <p className="text-sm text-gray-600">Age: {d.age}</p>
                            <p className="text-sm text-gray-600">
                              Guardian: {d.guardian}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No dependents available
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisReports;