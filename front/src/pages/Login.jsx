import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uc-auth-simple-page">
      <div className="uc-auth-simple-wrapper">
        <div className="uc-auth-simple-top">
          <span className="uc-auth-tag">Welcome back</span>
          <h1>Login to continue</h1>
          <p>
            Access your account to manage bookings and explore trusted home services.
          </p>
        </div>

        <div className="uc-auth-simple-card">
          <div className="uc-auth-card-top">
            <h2>Login</h2>
            <p>Enter your details to access your account</p>
          </div>

          <form className="uc-auth-form" onSubmit={handleLogin}>
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="uc-auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              {!loading && <FaArrowRight />}
            </button>
          </form>

          <p className="uc-auth-bottom">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;