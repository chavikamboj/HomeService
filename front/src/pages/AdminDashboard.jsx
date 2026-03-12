import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [bookingError, setBookingError] = useState("");
  const [contactError, setContactError] = useState("");

  const API_BASE_URL = "https://homeservice-production-8e5b.up.railway.app";

  const fetchBookings = async () => {
    try {
      setBookingError("");
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookingData = Array.isArray(res.data)
        ? res.data
        : res.data.bookings || [];

      console.log("BOOKINGS RESPONSE:", res.data);
      setBookings(bookingData);
    } catch (error) {
      console.error("BOOKINGS ERROR:", error.response?.data || error.message);
      setBookingError(error.response?.data?.message || error.message);
      setBookings([]);
    }
  };

  const fetchContacts = async () => {
    try {
      setContactError("");

      const res = await axios.get(`${API_BASE_URL}/api/contact`);

      const contactData = Array.isArray(res.data)
        ? res.data
        : res.data.contacts || [];

      console.log("CONTACTS RESPONSE:", res.data);
      setContacts(contactData);
    } catch (error) {
      console.error("CONTACTS ERROR:", error.response?.data || error.message);
      setContactError(error.response?.data?.message || error.message);
      setContacts([]);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API_BASE_URL}/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.error(
        "Error updating booking status:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("TOKEN:", localStorage.getItem("token"));
    fetchBookings();
    fetchContacts();
  }, []);

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="admin-hero">
          <p className="admin-tag">Admin Dashboard</p>
          <h1>Manage All Bookings</h1>
          <p>Review, track and update user booking statuses from one place.</p>
        </div>

        <p><strong>API URL:</strong> {API_BASE_URL || "Missing"}</p>
        <p><strong>Token:</strong> {localStorage.getItem("token") ? "Present" : "Missing"}</p>

        <h2 className="admin-section-title">All Bookings</h2>
        {bookingError && <p style={{ color: "red" }}>Booking Error: {bookingError}</p>}

        <div className="admin-booking-grid">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="admin-booking-card">
                <div className="admin-booking-header">
                  <h2>
                    {booking.Service?.title ||
                      booking.service?.title ||
                      booking.Service?.name ||
                      booking.service?.name ||
                      "Service"}
                  </h2>

                  <span className={`status-badge ${booking.status?.toLowerCase()}`}>
                    {booking.status
                      ? booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)
                      : "Pending"}
                  </span>
                </div>

                <p>
                  <strong>User:</strong>{" "}
                  {booking.User
                    ? `${booking.User.name} (${booking.User.email})`
                    : booking.user
                    ? `${booking.user.name} (${booking.user.email})`
                    : "No user / No email"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {booking.bookingDate
                    ? new Date(booking.bookingDate).toLocaleDateString("en-GB")
                    : "No date"}
                </p>

                <p>
                  <strong>Address:</strong> {booking.address || "No address"}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {booking.Service?.price || booking.service?.price || 0}
                </p>

                <div className="admin-btn-group">
                  <button onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                    Confirm
                  </button>
                  <button onClick={() => updateBookingStatus(booking.id, "completed")}>
                    Complete
                  </button>
                  <button onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="admin-section-title">Contact Messages</h2>
        {contactError && <p style={{ color: "red" }}>Contact Error: {contactError}</p>}

        <div className="admin-contact-grid">
          {contacts.length === 0 ? (
            <p>No contact messages found.</p>
          ) : (
            contacts.map((item) => (
              <div key={item.id} className="admin-contact-card">
                <div className="admin-contact-top">
                  <h3>{item.name}</h3>
                  <span>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-GB")
                      : "No date"}
                  </span>
                </div>

                <p className="admin-contact-email">{item.email}</p>
                <p className="admin-contact-message">{item.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;