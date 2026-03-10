import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(res.data.message || "Registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uc-auth-simple-page">
      <div className="uc-auth-simple-wrapper">
        <div className="uc-auth-simple-top">
          <span className="uc-auth-tag">Create account</span>
          <h1>Join HomeService</h1>
          <p>
            Create your account to book trusted professionals and manage services easily.
          </p>
        </div>

        <div className="uc-auth-simple-card">
          <div className="uc-auth-card-top">
            <h2>Register</h2>
            <p>Enter your details to create your account</p>
          </div>

          <form className="uc-auth-form" onSubmit={handleRegister}>
            <div className="uc-auth-field">
              <label>Full Name</label>
              <div className="uc-auth-input">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="uc-auth-field">
              <label>Email Address</label>
              <div className="uc-auth-input">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="uc-auth-field">
              <label>Password</label>
              <div className="uc-auth-input">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="uc-auth-btn" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <p className="uc-auth-bottom">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;