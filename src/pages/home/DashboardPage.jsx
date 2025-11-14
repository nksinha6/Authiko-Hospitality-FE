import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CommonTable from "../components/commontable/CommonTable";
import { initialTableData } from "../../utils/tableData";
import DateFilter from "../components/datehourfilter/DateFilter";

export default function DashboardPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [tableData] = useState(initialTableData);
  const [filters] = useState({
    propertyName: "",
    location: "",
    propertyId: "",
    totalRooms: "",
    activeCheckins: "",
  });

  // KPI Cards Data
  const kpis = [
    { title: "Total Properties", value: 42, color: "from-blue-600 to-cyan-600" },
    {
      title: "Total Check-ins (Current Month)",
      value: 26,
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Total Credits (Remaining)",
      value: 2,
      color: "from-green-600 to-teal-600",
    },
    {
      title: "Average Credit Consumption per Day",
      value: 1,
      color: "from-orange-600 to-red-600",
    },
  ];

  // Table configuration
  const headers = [
    "Property Name",
    "Location",
    "Property ID",
    "Total Rooms",
    "Active Check-ins (Today)",
  ];

  const defaultColumns = [
    { key: "propertyName", label: "Property Name" },
    { key: "location", label: "Location" },
    { key: "propertyId", label: "Property ID" },
    { key: "totalRooms", label: "Total Rooms" },
    { key: "activeCheckins", label: "Active Check-ins (Today)" },
  ];

  // Apply filters
  const filteredData = tableData.filter((item) => {
    return (
      item.propertyName
        .toLowerCase()
        .includes(filters.propertyName.toLowerCase()) &&
      item.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      item.propertyId
        .toLowerCase()
        .includes(filters.propertyId.toLowerCase()) &&
      (filters.totalRooms === "" ||
        item.totalRooms.toString().includes(filters.totalRooms)) &&
      (filters.activeCheckins === "" ||
        item.activeCheckins.toString().includes(filters.activeCheckins))
    );
  });

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
            {/* Dashboard Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Security Command Dashboard
              </h2>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi, index) => (
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
                    <div className="flex items-end justify-between mb-2">
                      <div className="text-3xl font-bold text-gray-900">
                        ${kpi.value.toFixed ? kpi.value.toFixed(2) : kpi.value}
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      $0.00 previous period
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
                    <div className="text-xs text-gray-400">
                      Updated 1:37 PM
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Hours Filter - Placeholder */}
            <div className="mb-6">
              {/* Add your DateHoursFilter component here if available */}
              {/* <DateHoursFilter /> */}
            </div>

              <div>
                <DateFilter />
                </div>
            {/* Properties Table */}
            <div>
              <CommonTable
                headers={headers}
                records={filteredData}
                defaultColumns={defaultColumns}
              />
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
}