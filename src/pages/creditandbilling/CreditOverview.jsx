import React, { useState } from "react";
import { TrendingUp, Download, DollarSign, CreditCard, TrendingDown, Activity } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CommonTable from "../components/commontable/CommonTable";
import DateFilter from "../components/datehourfilter/DateFilter";
import { tableData } from "../../utils/tableData";

export default function CreditOverview() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Sample credit data
  const creditData = {
    totalPurchased: 1000,
    creditsRemaining: 247,
    creditUtilization: 75.3,
    averageDailyConsumption: 8.2,
    contractStartDate: "2024-01-15",
    contractEndDate: "2024-12-14",
    lastPurchaseDate: "2024-06-20",
    nextBillingDate: "2024-12-14",
  };

  // KPI Cards Data
  const creditKPIs = [
    {
      icon: CreditCard,
      title: "Total Credits Purchased",
      value: creditData.totalPurchased.toLocaleString(),
      color: "from-blue-600 to-cyan-600",
      description: "Total credits bought since contract start",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: DollarSign,
      title: "Credits Remaining",
      value: creditData.creditsRemaining.toLocaleString(),
      color: "from-green-600 to-teal-600",
      description: "Credits available for usage",
      trend: "-5%",
      trendUp: false,
    },
    {
      icon: Activity,
      title: "Credit Utilization",
      value: `${creditData.creditUtilization}%`,
      color: "from-orange-600 to-red-600",
      description: "Percentage of credits used",
      trend: "+8%",
      trendUp: true,
    },
    {
      icon: TrendingDown,
      title: "Avg Daily Consumption",
      value: creditData.averageDailyConsumption.toFixed(1),
      color: "from-purple-600 to-pink-600",
      description: "Average credits used per day",
      trend: "+3%",
      trendUp: true,
    },
  ];

  // Table configuration
  const headers = [
    "Period",
    "Credits Used",
    "Daily Average",
    "Peak Usage",
    "Cost Efficiency",
  ];

  const defaultColumns = [
    { key: "period", label: "Period" },
    { key: "totalCredits", label: "Credits Used" },
    { key: "averagePerDay", label: "Daily Average" },
    { key: "remainingCredits", label: "Peak Usage" },
    { key: "efficiency", label: "Cost Efficiency" },
  ];

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
                Credit Overview
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Monitor your credit usage and subscription details
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {creditKPIs.map((kpi, index) => (
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
                    <div className="text-xs text-gray-400">
                      Updated 1:37 PM
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contract Information Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Subscription Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contract Start Date</p>
                  <p className="text-base font-semibold text-gray-900">
                    {new Date(creditData.contractStartDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contract End Date</p>
                  <p className="text-base font-semibold text-gray-900">
                    {new Date(creditData.contractEndDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Purchase Date</p>
                  <p className="text-base font-semibold text-gray-900">
                    {new Date(creditData.lastPurchaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Billing Date</p>
                  <p className="text-base font-semibold text-gray-900">
                    {new Date(creditData.nextBillingDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Filter */}
            <DateFilter records={tableData} />

            {/* Credit Usage Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CommonTable
                headers={headers}
                records={tableData}
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