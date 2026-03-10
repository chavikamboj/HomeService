import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      setCancelLoadingId(id);
      const res = await api.patch(`/bookings/${id}/cancel`);
      toast.success(res.data.message || "Booking cancelled");
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    } finally {
      setCancelLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="uc-bookings-page">
        <div className="uc-bookings-state-card">
          <h2>Loading your bookings...</h2>
          <p>Please wait while we fetch your booking history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uc-bookings-page">
      <div className="uc-bookings-header">
        <span className="uc-section-tag">My bookings</span>
        <h1>Your booked services</h1>
        <p>Track your service bookings, dates and current status here.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="uc-bookings-state-card">
          <h2>No bookings yet</h2>
          <p>You haven’t booked any service yet.</p>
        </div>
      ) : (
        <div className="uc-bookings-grid">
          {bookings.map((booking) => (
            <div className="uc-booking-item-card" key={booking.id}>
              <div className="uc-booking-top">
                <div>
                  <h3>{booking.Service?.name || "Service"}</h3>
                  <p className="uc-booking-date">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`uc-booking-status ${
                    booking.status?.toLowerCase() || ""
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="uc-booking-body">
                <p>
                  <strong>Address:</strong> {booking.address}
                </p>

                {booking.Service?.price && (
                  <p>
                    <strong>Price:</strong> ₹{booking.Service.price}
                  </p>
                )}
              </div>

              {booking.status?.toLowerCase() !== "cancelled" &&
                booking.status?.toLowerCase() !== "completed" && (
                  <button
                    className="uc-cancel-booking-btn"
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={cancelLoadingId === booking.id}
                  >
                    {cancelLoadingId === booking.id
                      ? "Cancelling..."
                      : "Cancel booking"}
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;