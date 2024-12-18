import React, { useState } from "react";
import api from "../api/api";

function EventModal({ event, onClose, isVendor }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = async () => {
    if (!selectedDate) {
      alert("Please select a date for approval.");
      return;
    }
    try {
      await api.post(`/api/events/${event.ID}/approve`, { confirmed_date: selectedDate });
      alert("Event approved successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to approve event:", error);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      alert("Please enter a rejection reason.");
      return;
    }
    try {
      await api.post(`/api/events/${event.ID}/reject`, { remarks: rejectionReason });
      alert("Event rejected successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to reject event:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{event.EventName}</h2>
        <p><strong>Vendor Name:</strong> {event.VendorName}</p>
        <p><strong>Company Name:</strong> {event.CompanyName}</p>
        {!event.ConfirmedDate && <p><strong>Proposed Dates:</strong> {event.ProposedDates}</p>}
        <p><strong>Location:</strong> {event.Location}</p>
        <p><strong>Status:</strong> {event.Status}</p>
        {event.Remarks && <p><strong>Remarks:</strong> {event.Remarks}</p>}
        {event.ConfirmedDate && <p><strong>Confirmed Date:</strong> {event.ConfirmedDate}</p>}

        {isVendor && event.Status === "PENDING" && (
          <div>
            <h3 className="text-lg font-bold mt-4">Actions</h3>
            <div className="mt-3">
              <label className="block mb-1">
                <strong>Select Date for Approval:</strong>
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">Select a date</option>
                {event.ProposedDates.split(",").map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block mb-1">
                <strong>Rejection Reason:</strong>
              </label>
              <textarea
                className="w-full p-2 border rounded-lg"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection"
              ></textarea>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EventModal;
