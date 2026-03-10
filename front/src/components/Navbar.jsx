import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let isAdmin = false;

  try {
    const payload = JSON.parse(atob(token?.split(".")[1] || ""));
    isAdmin = payload?.role === "admin";
  } catch (error) {
    isAdmin = false;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="uc-navbar">
      <div className="uc-navbar-left">
        <Link to="/" className="uc-navbar-logo">
          <span className="uc-logo-box">HS</span>
          <span className="uc-logo-text">HomeService</span>
        </Link>
      </div>

      <div className="uc-navbar-center">
        <div className="uc-nav-location">
          <FaMapMarkerAlt />
          <span>Chandigarh, India</span>
        </div>

        <div className="uc-nav-search">
          <FaSearch />
          <input type="text" placeholder="Search services" />
        </div>
      </div>

      <div className="uc-navbar-right">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact Us</Link>

        {token ? (
          <>
            <Link to="/my-bookings">My Bookings</Link>

            {isAdmin && <Link to="/admin">Admin</Link>}

            <button className="uc-nav-register" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register" className="uc-nav-register">
              Register
            </Link>
          </>
        )}

        <button className="uc-icon-btn">
          <FaShoppingCart />
        </button>

        <button className="uc-icon-btn">
          <FaUserCircle />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;