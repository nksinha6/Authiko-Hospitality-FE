import React from "react";
import { format } from "date-fns";

const CommonTable = ({
  columns,
  headers = [],
  records = [],
  handleShowDetails,
  maskPhone,
  defaultColumns,
}) => {
  // Build effective columns
  let effectiveColumns = columns && columns.length ? columns : null;
  if (!effectiveColumns) {
    if (headers && headers.length) {
      effectiveColumns = headers.map((h, idx) => {
        const def = defaultColumns ? defaultColumns[idx] : null;
        return {
          key: def ? def.key : h.toLowerCase().replace(/\s+/g, ""),
          label: h,
        };
      });
    } else {
      effectiveColumns = defaultColumns || [];
    }
  }

  const renderValue = (record, col) => {
    if (col.render) return col.render(record);

    const key = col.key;
    
    // Details pseudo-key
    if (key === "details") {
      if (!handleShowDetails) return "";
      return (
        <span
          className="text-blue-600 cursor-pointer hover:text-blue-700 text-sm"
          onClick={() => handleShowDetails(record)}
        >
          View Details
        </span>
      );
    }

    // Tolerant access
    let val = record[key];
    if (val === undefined) val = record[key.toLowerCase()];
    if (val === undefined && key && key.length > 1) {
      const alt = key.charAt(0).toLowerCase() + key.slice(1);
      val = record[alt];
    }

    if (val === undefined || val === null) return "";

    const lowerKey = key.toLowerCase();
    
    // Date formatting
    if (
      lowerKey.includes("check") ||
      lowerKey.includes("date") ||
      val instanceof Date
    ) {
      try {
        const d = new Date(val);
        if (!isNaN(d)) return format(d, "d MMM yy, h:mm a");
      } catch (e) {
        // fallthrough
      }
    }

    // Phone masking
    if (lowerKey.includes("phone") && maskPhone) return maskPhone(val);

    // Verification display
    if (lowerKey === "verification" || lowerKey.includes("verify")) {
      const verification = record.verification || record.verificationType || "";
      const faceMatch =
        record.faceMatch || record.faceID || record.faceMatchStatus;
      if (verification === "Aadhaar" && faceMatch === "Match") {
        return (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            Aadhaar + Face ID
          </span>
        );
      }
      return (
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
          Manual Verification
        </span>
      );
    }

    // Default
    return String(val);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {effectiveColumns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-medium text-gray-700"
                >
                  {col.label || ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records && records.length > 0 ? (
              records.map((r, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {effectiveColumns.map((col, ci) => (
                    <td key={ci} className="px-4 py-4 text-gray-600">
                      {renderValue(r, col)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={effectiveColumns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommonTable;