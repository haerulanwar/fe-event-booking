import React, { useEffect, useState } from "react";
import api from "../api/api";
import EventModal from "./EventModal";

function VendorDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    fetchEvents(); // Refresh events after approve/reject
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Vendor Dashboard</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="border-b">
              <th className="p-3 font-medium">Event Name</th>
              <th className="p-3 font-medium">Vendor Name</th>
              <th className="p-3 font-medium">Confirmed Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Date Created</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b hover:bg-blue-50">
                <td className="p-3">{event.EventName}</td>
                <td className="p-3">{event.VendorName}</td>
                <td className="p-3">{event.ConfirmedDate || event.ProposedDates}</td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      event.Status
                    )}`}
                  >
                    {event.Status}
                  </span>
                <td className="p-3">
                  {new Date(event.CreatedAt).toISOString().split('T')[0]}
                </td>
                <td className="p-3">
                  <button
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
                    onClick={() => setSelectedEvent(event)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} isVendor={true} />
      )}
    </div>
  );
}

export default VendorDashboard;
