import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CheckCircle,
  X,
  Clock,
  AlertCircle,
  Phone,
  User,
  Calendar,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Success Modal Component
const SuccessModal = ({ show, handleClose, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600">{message || "Operation successful."}</p>
      </div>
    </div>
  );
};

// Guest Details Modal Component
const GuestDetailsModal = ({ show, handleClose, guest }) => {
  if (!show || !guest) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white flex items-center justify-between">
          <h3 className="text-xl font-bold">Guest Details</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="font-semibold text-gray-900">{guest.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Aadhaar Status</p>
            <p className="font-semibold text-gray-900 capitalize">
              {guest.aadhaarStatus}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Face Status</p>
            <p className="font-semibold text-gray-900 capitalize">
              {guest.faceStatus}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Timestamp</p>
            <p className="font-semibold text-gray-900">{guest.timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GuestPhoneEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const { totalGuests, bookingId } = location.state || {};
  const [guests, setGuests] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Initialize guest list
  useEffect(() => {
    if (totalGuests) {
      const initialGuests = Array.from({ length: totalGuests }, () => ({
        phoneNumber: "",
        isVerified: false,
        aadhaarStatus: "pending",
        faceStatus: "pending",
        timestamp: null,
      }));
      setGuests(initialGuests);
    }
  }, [totalGuests]);

  const handlePhoneNumberChange = (index, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index].phoneNumber = value;
    setGuests(updatedGuests);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return phoneNumber && phoneNumber.length >= 10;
  };

  const handleVerifyGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests[index].isVerified = true;
    updatedGuests[index].timestamp = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    const phone = updatedGuests[index].phoneNumber;
    const phoneWithoutCode = phone.replace(/^91/, "");

    if (phoneWithoutCode === "9104622293") {
      updatedGuests[index].aadhaarStatus = "verified";
      updatedGuests[index].faceStatus = "processing";
      setGuests(updatedGuests);

      setTimeout(() => {
        const faceUpdated = [...updatedGuests];
        faceUpdated[index].faceStatus = "verified";
        setGuests(faceUpdated);
      }, 7000);
    } else {
      updatedGuests[index].aadhaarStatus = "processing";
      setGuests(updatedGuests);

      setTimeout(() => {
        const aadhaarUpdated = [...updatedGuests];
        aadhaarUpdated[index].aadhaarStatus = "verified";
        aadhaarUpdated[index].faceStatus = "processing";
        setGuests(aadhaarUpdated);

        setTimeout(() => {
          const faceUpdated = [...aadhaarUpdated];
          faceUpdated[index].faceStatus = "verified";
          setGuests(faceUpdated);
        }, 7000);
      }, 5000);
    }
  };

  const handleChangeNumber = (index) => {
    const updatedGuests = [...guests];
    updatedGuests[index].isVerified = false;
    updatedGuests[index].phoneNumber = "";
    updatedGuests[index].aadhaarStatus = "pending";
    updatedGuests[index].faceStatus = "pending";
    updatedGuests[index].timestamp = null;
    setGuests(updatedGuests);
  };

  const handleConfirmCheckIn = () => {
    setShowSuccessModal(true);
    setModalMessage("Booking check-in Successful!");
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/reservation-entry");
    }, 1500);
  };

  const handleCancelVerification = () => {
    if (window.confirm("Cancel verification process?")) {
      navigate("/reservation-entry");
    }
  };

  const allGuestsFullyVerified =
    guests.length > 0 &&
    guests.every(
      (g) =>
        g.isVerified &&
        g.aadhaarStatus === "verified" &&
        g.faceStatus === "verified"
    );

  const hasAnyVerified = guests.some(
    (g) => g.aadhaarStatus === "verified" && g.faceStatus === "verified"
  );

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
                Verify Guests for Booking ID:{" "}
                <span className="text-blue-600">{bookingId || "VXXXXXX"}</span>
              </h2>
              <p className="text-gray-500 text-sm">
                Enter phone numbers and verify each guest
              </p>
            </div>

            {/* Guest Verification Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Sr No
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Guest Phone
                      </th>
                      {guests.some((g) => g.isVerified) && (
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Aadhaar Status
                        </th>
                      )}
                      {guests.some((g) => g.isVerified) && (
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Face ID
                        </th>
                      )}
                      {guests.some((g) => g.isVerified) && (
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Timestamp
                        </th>
                      )}
                      {hasAnyVerified && (
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">
                          Guest Details
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          {!guest.isVerified ? (
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <PhoneInput
                                  country="in"
                                  value={guest.phoneNumber}
                                  onChange={(value) =>
                                    handlePhoneNumberChange(index, value)
                                  }
                                  placeholder="Enter phone number"
                                  enableSearch
                                  containerClass="w-full"
                                  inputClass="w-full"
                                />
                              </div>
                              <button
                                onClick={() => handleVerifyGuest(index)}
                                disabled={
                                  !isValidPhoneNumber(guest.phoneNumber)
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium whitespace-nowrap"
                              >
                                Verify Guest
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <PhoneInput
                                  country="in"
                                  value={guest.phoneNumber}
                                  disabled
                                  containerClass="w-full"
                                />
                              </div>
                              {guest.aadhaarStatus !== "verified" && (
                                <button
                                  onClick={() => handleChangeNumber(index)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  change number
                                </button>
                              )}
                            </div>
                          )}
                        </td>

                        {guest.isVerified && (
                          <>
                            <td className="px-6 py-4">
                              {guest.aadhaarStatus === "processing" ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-yellow-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">Processing...</span>
                                  </div>
                                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                                    resend verification link
                                  </button>
                                </div>
                              ) : guest.aadhaarStatus === "verified" ? (
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    Verified
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>

                            <td className="px-6 py-4">
                              {guest.faceStatus === "processing" ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-yellow-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">Processing...</span>
                                  </div>
                                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium block">
                                    Retry Face Match
                                  </button>
                                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium block">
                                    Verify Face ID Manually
                                  </button>
                                </div>
                              ) : guest.faceStatus === "verified" ? (
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">
                                    Verified
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {guest.timestamp || "-"}
                            </td>

                            {guest.aadhaarStatus === "verified" &&
                              guest.faceStatus === "verified" && (
                                <td className="px-6 py-4">
                                  <button
                                    onClick={() => {
                                      setSelectedGuest(guest);
                                      setShowGuestModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                  >
                                    View Details
                                  </button>
                                </td>
                              )}
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={handleCancelVerification}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel Verification
              </button>
              <button
                onClick={handleConfirmCheckIn}
                disabled={!allGuestsFullyVerified}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Submit & Confirm Check-in
              </button>
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

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
        message={modalMessage}
      />

      {/* Guest Details Modal */}
      <GuestDetailsModal
        show={showGuestModal}
        handleClose={() => setShowGuestModal(false)}
        guest={selectedGuest}
      />
    </div>
  );
}