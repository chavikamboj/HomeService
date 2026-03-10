import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    bookingDate: "",
    address: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchService = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      const foundService = res.data.find((item) => String(item.id) === String(id));

      if (!foundService) {
        toast.error("Service not found");
        navigate("/services");
        return;
      }

      setService(foundService);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setBookingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!bookingData.bookingDate || !bookingData.address) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setBookingLoading(true);

      const res = await api.post("/bookings/create", {
        serviceId: service.id,
        bookingDate: bookingData.bookingDate,
        address: bookingData.address,
      });

      toast.success(res.data.message || "Booking created successfully");

      setBookingData({
        bookingDate: "",
        address: "",
      });

      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="uc-detail-page">
        <div className="uc-detail-state-card">
          <h2>Loading service...</h2>
          <p>Please wait while we fetch service details.</p>
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="uc-detail-page">
      <div className="uc-detail-wrapper">
        <div className="uc-detail-left">
          <img
            src="https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={service.name}
            className="uc-detail-image"
          />

          <div className="uc-detail-card">
            <span className="uc-detail-badge">Professional service</span>
            <h1>{service.name}</h1>
            <p>{service.description}</p>

            <div className="uc-detail-price-row">
              <span>Starting price</span>
              <strong>₹{service.price}</strong>
            </div>

            <div className="uc-detail-points">
              <div className="uc-detail-point">Trusted professionals</div>
              <div className="uc-detail-point">Easy doorstep booking</div>
              <div className="uc-detail-point">Fast support</div>
            </div>
          </div>
        </div>

        <div className="uc-detail-right">
          <div className="uc-booking-card">
            <h2>Book this service</h2>
            <p>Choose your preferred date and add your address.</p>

            <form className="uc-booking-form" onSubmit={handleBooking}>
              <div className="uc-booking-field">
                <label>Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  value={bookingData.bookingDate}
                  onChange={handleChange}
                />
              </div>

              <div className="uc-booking-field">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="Enter your full address"
                  rows="5"
                  value={bookingData.address}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="uc-booking-btn" disabled={bookingLoading}>
                {bookingLoading ? "Booking..." : "Book now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;