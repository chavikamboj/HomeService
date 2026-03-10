import { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", formData);

      setSuccessMsg("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setErrorMsg("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <p className="contact-tag">Contact Us</p>
        <h1>We’d love to hear from you</h1>
        <p className="contact-subtext">
          Have a question, complaint, or need help with your booking? Send us a message.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="contact-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="contact-group">
            <label>Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button type="submit" className="contact-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;