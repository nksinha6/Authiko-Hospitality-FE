import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronDown, Calendar, RotateCcw, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const DateFilter = ({ records = [] }) => {
  const [filter, setFilter] = useState("is after");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [lastValue, setLastValue] = useState("");
  const [lastUnit, setLastUnit] = useState("days");

  const toggleButtonRef = useRef(null);
  const panelRef = useRef(null);

  const filterShortNames = {
    "is in the last": "Last",
    "is equal to": "On",
    "is between": "Between",
    "is on or after": "From",
    "is before or on": "Until",
    "is after": "After",
  };

  const getFilterLabel = () => {
    const short = filterShortNames[filter] || filter;

    if (filter === "is in the last") {
      return `${short} ${lastValue || 0} ${lastUnit}`;
    }

    if (filter === "is between" && startDate && endDate) {
      return `${short} ${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (
      (filter === "is equal to" ||
        filter === "is after" ||
        filter === "is on or after" ||
        filter === "is before or on") &&
      date
    ) {
      return `${short} ${formatDate(date)}`;
    }

    return short;
  };

  useEffect(() => {
    if (filter === "is after") {
      const today = new Date();
      setDate(today);
    } else {
      setDate(null);
      setStartDate(null);
      setEndDate(null);
    }
  }, [filter]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setFilterVisible(false);
      }
    };

    if (filterVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [filterVisible]);

  const applyFilter = () => {
    setFilterVisible(false);
  };

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");
    XLSX.writeFile(workbook, "records.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Records Report", 14, 16);
    
    // Customize based on your data structure
    const headers = records.length > 0 ? Object.keys(records[0]) : [];
    const body = records.map(record => Object.values(record));
    
    autoTable(doc, {
      startY: 22,
      head: [headers],
      body: body,
    });
    doc.save("records.pdf");
  };

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
      {/* Filter Section */}
      <div className="relative inline-block">
        <button
          ref={toggleButtonRef}
          onClick={() => setFilterVisible(!filterVisible)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors"
        >
          <X className="w-3 h-3 text-gray-500" />
          <span className="text-gray-600">Evidence due by</span>
          <span className="font-semibold text-gray-900 max-w-[160px] truncate">
            | {getFilterLabel()}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {filterVisible && (
          <div
            ref={panelRef}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[320px] z-50"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Filter by Evidence due by
            </h3>

            {/* Filter Type Selector */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-sm font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="is in the last">is in the last</option>
              <option value="is equal to">is equal to</option>
              <option value="is between">is between</option>
              <option value="is on or after">is on or after</option>
              <option value="is before or on">is before or on</option>
              <option value="is after">is after</option>
            </select>

            {/* Conditional Inputs */}
            {filter === "is in the last" ? (
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="w-5 h-5 text-blue-500 transform scale-x-[-1]" />
                <input
                  type="number"
                  value={lastValue}
                  onChange={(e) => setLastValue(e.target.value)}
                  className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
                <select
                  value={lastUnit}
                  onChange={(e) => setLastUnit(e.target.value)}
                  className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="months">months</option>
                </select>
              </div>
            ) : filter === "is between" ? (
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <RotateCcw className="w-5 h-5 text-blue-500 transform scale-x-[-1]" />
                <Calendar className="w-4 h-4 text-gray-500" />
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MMM/yy"
                  className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Start date"
                />
                <span className="text-sm text-gray-600 font-medium">and</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="dd/MMM/yy"
                  className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="End date"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="w-5 h-5 text-blue-500 transform scale-x-[-1]" />
                <Calendar className="w-4 h-4 text-gray-500" />
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MMM/yy"
                  className="w-28 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select date"
                />
              </div>
            )}

            {/* Apply Button */}
            <button
              onClick={applyFilter}
              className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default DateFilter;