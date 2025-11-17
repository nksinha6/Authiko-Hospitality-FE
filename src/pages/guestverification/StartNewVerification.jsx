import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Calendar, Users, Hash } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function StartNewVerification() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [adults, setAdults] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const BookingIDList = [
    { id: 1, bookingId: "VVQ23001", guestName: "Aarav Patel", guests: 2 },
    { id: 2, bookingId: "VVQ23002", guestName: "Sophia Williams", guests: 4 },
    { id: 3, bookingId: "VVQ23003", guestName: "Liam Johnson", guests: 3 },
    { id: 4, bookingId: "VVQ23004", guestName: "Mia Sharma", guests: 4 },
    { id: 5, bookingId: "VVQ23005", guestName: "Ethan Brown", guests: 3 },
    { id: 6, bookingId: "VVQ23006", guestName: "Olivia Davis", guests: 1 },
    { id: 7, bookingId: "VVQ23007", guestName: "Noah Wilson", guests: 2 },
    { id: 8, bookingId: "VVQ23008", guestName: "Isabella Garcia", guests: 4 },
    { id: 9, bookingId: "VVQ23009", guestName: "James Miller", guests: 2 },
    { id: 10, bookingId: "VVQ23010", guestName: "Amelia Martinez", guests: 1 },
    { id: 11, bookingId: "VVQ23011", guestName: "Benjamin Lee", guests: 2 },
    { id: 12, bookingId: "VVQ23012", guestName: "Charlotte Kim", guests: 1 },
    { id: 13, bookingId: "VVQ23013", guestName: "Alexander Chen", guests: 3 },
  ];

  const handleStartVerification = (e) => {
    e.preventDefault();

    if (!bookingId || !adults || !guestName) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const totalGuests = parseInt(adults, 10);
    localStorage.setItem("totalGuests", totalGuests);

    navigate("/guest-phone-entry", {
      state: {
        bookingId,
        guestName,
        adults: parseInt(adults, 10),
        totalGuests,
        currentGuest: 1,
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSelectFromModal = (reservation) => {
    setBookingId(reservation.bookingId);
    if (reservation.guests > 1) {
      setGuestName(`${reservation.guestName} +${reservation.guests - 1}`);
    } else {
      setGuestName(reservation.guestName);
    }
    setAdults(reservation.guests.toString());
    setIsModalOpen(false);
    setSearchTerm("");
  };

  const filteredReservations = BookingIDList.filter((res) =>
    res.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
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
                Start New Verification
              </h2>
              <p className="text-gray-500 text-sm">
                Enter booking details to begin guest verification process
              </p>
            </div>

            {/* Form Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    Guest Check-In Verification
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Enter booking details to begin verification
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <form onSubmit={handleStartVerification}>
                    {/* Booking ID */}
                    <div className="mb-6">
                      <label
                        htmlFor="bookingId"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Booking ID *
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="bookingId"
                          value={bookingId}
                          onChange={(e) => setBookingId(e.target.value)}
                          required
                          placeholder="Enter booking ID"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Guest Name */}
                    <div className="mb-6">
                      <label
                        htmlFor="guestName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Guest Name *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="guestName"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          required
                          placeholder="Enter guest name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Number of Guests */}
                    <div className="mb-6">
                      <label
                        htmlFor="adults"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          id="adults"
                          value={adults}
                          onChange={(e) => setAdults(e.target.value)}
                          min="1"
                          required
                          placeholder="Enter number of guests"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Today's Bookings Link */}
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        View Today's Bookings
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                      >
                        Next
                      </button>
                    </div>
                  </form>
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

      {/* Today's Bookings Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">Today's Bookings</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bookings List */}
            <div className="overflow-y-auto max-h-[calc(80vh-200px)]">
              {filteredReservations.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredReservations.map((res) => (
                    <li
                      key={res.id}
                      onClick={() => handleSelectFromModal(res)}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {res.bookingId}
                          </p>
                          <p className="text-sm text-gray-600">
                            {res.guestName}
                            {res.guests > 1 ? ` +${res.guests - 1}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {res.guests} {res.guests === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No bookings found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}