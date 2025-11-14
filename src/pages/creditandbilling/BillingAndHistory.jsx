import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Download,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CommonTable from "../components/commontable/CommonTable";
import DateFilter from "../components/datehourfilter/DateFilter";
import { billingData } from "../../utils/tableData";

export default function BillingHistory() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Calculate billing summary
  const totalAmountPaid = billingData
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amountPaid, 0);

  const totalCreditsPurchased = billingData.reduce(
    (sum, invoice) => sum + invoice.creditsPurchased,
    0
  );

  const successfulPayments = billingData.filter(
    (invoice) => invoice.status === "paid"
  ).length;

  const pendingOrFailed = billingData.filter(
    (invoice) => invoice.status === "pending" || invoice.status === "failed"
  ).length;

  // Billing summary KPIs
  const billingKPIs = [
    {
      icon: DollarSign,
      title: "Total Amount Paid",
      value: `₹${totalAmountPaid.toLocaleString()}`,
      color: "from-green-600 to-teal-600",
      description: "Total payments received",
      trend: "+15%",
      trendUp: true,
    },
    {
      icon: CreditCard,
      title: "Total Credits Purchased",
      value: totalCreditsPurchased.toLocaleString(),
      color: "from-blue-600 to-cyan-600",
      description: "Total credits bought",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: CheckCircle,
      title: "Successful Payments",
      value: successfulPayments.toString(),
      color: "from-teal-600 to-green-600",
      description: "Completed transactions",
      trend: "+8%",
      trendUp: true,
    },
    {
      icon: XCircle,
      title: "Pending/Failed",
      value: pendingOrFailed.toString(),
      color: "from-orange-600 to-red-600",
      description: "Requires attention",
      trend: "-3%",
      trendUp: false,
    },
  ];

  // Table configuration
  const headers = [
    "Invoice No.",
    "Invoice Date",
    "Credits Purchased",
    "Payment Mode",
    "Amount Paid",
    "Status",
    "Download Invoice",
  ];

  const defaultColumns = [
    { key: "invoiceNo", label: "Invoice No." },
    {
      key: "invoiceDate",
      label: "Invoice Date",
      render: (record) => {
        const date = new Date(record.invoiceDate);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    { key: "creditsPurchased", label: "Credits Purchased" },
    { key: "paymentMode", label: "Payment Mode" },
    {
      key: "amountPaid",
      label: "Amount Paid",
      render: (record) => `₹${record.amountPaid.toLocaleString()}`,
    },
    {
      key: "status",
      label: "Status",
      render: (record) => {
        const status = record.status;
        let statusConfig = {
          paid: {
            color: "bg-green-100 text-green-800",
            icon: <CheckCircle className="w-4 h-4" />,
            label: "Paid",
          },
          pending: {
            color: "bg-yellow-100 text-yellow-800",
            icon: <Clock className="w-4 h-4" />,
            label: "Pending",
          },
          failed: {
            color: "bg-red-100 text-red-800",
            icon: <XCircle className="w-4 h-4" />,
            label: "Failed",
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
      key: "downloadUrl",
      label: "Download Invoice",
      render: (record) => (
        <button
          onClick={() => handleDownloadInvoice(record)}
          className="flex items-center gap-2 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      ),
    },
  ];

  const handleDownloadInvoice = (invoice) => {
    // Simulate invoice download
    console.log("Downloading invoice:", invoice.invoiceNo);
    alert(`Downloading invoice ${invoice.invoiceNo}`);
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
                Billing History
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View your transaction history and download invoices
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {billingKPIs.map((kpi, index) => (
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

            {/* Payment Mode Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credit Card</p>
                    <p className="text-xl font-bold text-gray-900">
                      {
                        billingData.filter(
                          (inv) => inv.paymentMode === "Credit Card"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">UPI</p>
                    <p className="text-xl font-bold text-gray-900">
                      {billingData.filter((inv) => inv.paymentMode === "UPI").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bank Transfer</p>
                    <p className="text-xl font-bold text-gray-900">
                      {
                        billingData.filter(
                          (inv) => inv.paymentMode === "Bank Transfer"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Filter */}
            <DateFilter records={billingData} />

            {/* Billing History Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CommonTable
                headers={headers}
                records={billingData}
                defaultColumns={defaultColumns}
              />
            </div>

            {/* Table Footer Info */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {billingData.length} of {billingData.length} invoices
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>

            {/* Payment Status Legend */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h4 className="text-sm font-bold text-gray-900 mb-4">
                Payment Status Legend
              </h4>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-4 h-4" />
                    Paid
                  </span>
                  <span className="text-sm text-gray-600">
                    Payment completed successfully
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                  <span className="text-sm text-gray-600">
                    Payment processing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle className="w-4 h-4" />
                    Failed
                  </span>
                  <span className="text-sm text-gray-600">
                    Payment failed or rejected
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
}