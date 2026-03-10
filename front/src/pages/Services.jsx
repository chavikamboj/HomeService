import { useEffect, useState } from "react";
import {
  FaSnowflake,
  FaBolt,
  FaTools,
  FaPumpSoap,
  FaArrowRight,
  FaCogs,
  FaPaintRoller,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServiceTitle = (service) => {
    if (service?.name && service.name.trim() !== "") {
      return service.name;
    }

    const desc = (service?.description || "").toLowerCase();

    if (
      desc.includes("washing machine") ||
      desc.includes("refrigerator") ||
      desc.includes("microwave") ||
      desc.includes("appliance")
    ) {
      return "Appliance Repair";
    }

    if (desc.includes("ac")) return "AC Repair";
    if (desc.includes("plumb")) return "Plumbing Service";
    if (desc.includes("electrical") || desc.includes("fan") || desc.includes("switch")) {
      return "Electrical Repair";
    }
    if (desc.includes("clean")) return "Deep Cleaning";
    if (desc.includes("paint") || desc.includes("interior") || desc.includes("exterior")) {
      return "House Painting";
    }

    return "Home Service";
  };

  const getServiceIcon = (text = "") => {
    const lower = text.toLowerCase();

    if (
      lower.includes("washing machine") ||
      lower.includes("refrigerator") ||
      lower.includes("microwave") ||
      lower.includes("appliance")
    ) {
      return <FaCogs />;
    }

    if (lower.includes("ac")) return <FaSnowflake />;
    if (lower.includes("electrical") || lower.includes("fan") || lower.includes("switch")) {
      return <FaBolt />;
    }
    if (lower.includes("plumb")) return <FaTools />;
    if (lower.includes("clean")) return <FaPumpSoap />;
    if (lower.includes("paint") || lower.includes("interior") || lower.includes("exterior")) {
      return <FaPaintRoller />;
    }

    return <FaTools />;
  };

  const getServiceImage = (text = "") => {
    const lower = text.toLowerCase();

    if (
      lower.includes("washing machine") ||
      lower.includes("refrigerator") ||
      lower.includes("microwave") ||
      lower.includes("appliance")
    ) {
      return "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    if (lower.includes("ac")) {
      return "https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    if (lower.includes("plumb")) {
      return "https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    if (lower.includes("electrical") || lower.includes("fan") || lower.includes("switch")) {
      return "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    if (lower.includes("clean")) {
      return "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    if (lower.includes("paint") || lower.includes("interior") || lower.includes("exterior")) {
      return "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=1200";
    }

    return "https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=1200";
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="uc-services-page">
      <section className="uc-services-hero">
        <div className="uc-services-hero-inner">
          <span className="uc-section-tag">Home services</span>
          <h1>Services for every home need</h1>
          <p>
            Book reliable professionals for repair, cleaning, maintenance and
            improvement — all in one place.
          </p>
        </div>
      </section>

      <section className="uc-services-list-section">
        {loading ? (
          <div className="uc-state-card">
            <h2>Loading services...</h2>
            <p>Please wait while we fetch available services for you.</p>
          </div>
        ) : services.length === 0 ? (
          <div className="uc-state-card">
            <h2>No services found</h2>
            <p>Services abhi available nahi hain. Thodi der baad try karo.</p>
          </div>
        ) : (
          <div className="uc-services-grid">
            {services.map((service) => {
              const matchText = service?.name || service?.description || "";
              const title = getServiceTitle(service);

              return (
                <div className="uc-service-card" key={service.id}>
                  <img
                    src={getServiceImage(matchText)}
                    alt={title}
                    className="uc-service-image"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg?auto=compress&cs=tinysrgb&w=1200";
                    }}
                  />

                  <div className="uc-service-card-body">
                    <div className="uc-service-icon">
                      {getServiceIcon(matchText)}
                    </div>

                    <div className="uc-service-content">
                      <div className="uc-service-head">
                        <h3>{title}</h3>
                        <span className="uc-price">₹{service.price}</span>
                      </div>

                      <p className="uc-service-desc">
                        {service.description ||
                          "Professional home service for your daily needs."}
                      </p>
                    </div>

                    <Link
                      to={`/services/${service.id}`}
                      className="uc-service-btn"
                    >
                      View service <FaArrowRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Services;