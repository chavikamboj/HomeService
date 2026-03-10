import { Link } from "react-router-dom";
import {
  FaSnowflake,
  FaBolt,
  FaPumpSoap,
  FaPaintRoller,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <div className="uc-home-page">
      <section className="uc-home-banners">
        <div className="uc-main-banner">
          <div className="uc-main-banner-content">
            <span className="uc-discount-badge">25% OFF</span>
            <h2>Home painting & waterproofing</h2>
            <p>Pay after 100% satisfaction</p>
            <Link to="/services">Book now</Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80"
            alt="Painting service"
          />
        </div>

        <div className="uc-small-banners">
          <div className="uc-small-banner uc-green-banner">
            <div className="uc-small-banner-content">
              <h3>Shine your bathroom deserves</h3>
              <Link to="/services">Book now</Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Cleaning service"
            />
          </div>

          <div className="uc-small-banner uc-pink-banner">
            <div className="uc-small-banner-content">
              <span className="uc-discount-badge light">Special</span>
              <h3>Salon & beauty packages</h3>
              <Link to="/services">Book now</Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
              alt="Beauty service"
            />
          </div>
        </div>
      </section>

      <section className="uc-categories-section">
        <div className="uc-section-head">
          <h2>Popular categories</h2>
          <Link to="/services">View all</Link>
        </div>

        <div className="uc-categories-grid">
          <div className="uc-category-card">
            <img
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
              alt="AC Repair"
              className="uc-category-image"
            />
            <div className="uc-category-icon">
              <FaSnowflake />
            </div>
            <h3>AC Repair</h3>
            <p>Repair & servicing</p>
          </div>

          <div className="uc-category-card">
            <img
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
              alt="Electrical"
              className="uc-category-image"
            />
            <div className="uc-category-icon">
              <FaBolt />
            </div>
            <h3>Electrical</h3>
            <p>Switches, fans & wiring</p>
          </div>

          <div className="uc-category-card">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Cleaning"
              className="uc-category-image"
            />
            <div className="uc-category-icon">
              <FaPumpSoap />
            </div>
            <h3>Cleaning</h3>
            <p>Home deep cleaning</p>
          </div>

          <div className="uc-category-card">
            <img
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80"
              alt="Painting"
              className="uc-category-image"
            />
            <div className="uc-category-icon">
              <FaPaintRoller />
            </div>
            <h3>Painting</h3>
            <p>Wall paint solutions</p>
          </div>
        </div>
      </section>

      <section className="uc-featured-section">
        <div className="uc-section-head">
          <h2>Featured services</h2>
          <Link to="/services">Explore services</Link>
        </div>

        <div className="uc-featured-grid">
          <div className="uc-feature-card">
            <img
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
              alt="AC Repair"
              className="uc-feature-image"
            />
            <div className="uc-feature-card-body">
              <span className="uc-feature-badge">Most booked</span>
              <h3>AC Repair</h3>
              <p>Quick repair, gas refill and servicing by trained professionals.</p>
              <div className="uc-feature-bottom">
                <span>Starting at ₹1500</span>
                <Link to="/services">
                  View <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>

          <div className="uc-feature-card">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Home Cleaning"
              className="uc-feature-image"
            />
            <div className="uc-feature-card-body">
              <span className="uc-feature-badge">Popular</span>
              <h3>Home Cleaning</h3>
              <p>Deep cleaning solutions for a fresh and spotless home.</p>
              <div className="uc-feature-bottom">
                <span>Starting at ₹1500</span>
                <Link to="/services">
                  View <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>

          <div className="uc-feature-card">
            <img
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
              alt="Electrical Repair"
              className="uc-feature-image"
            />
            <div className="uc-feature-card-body">
              <span className="uc-feature-badge">Recommended</span>
              <h3>Electrical Repair</h3>
              <p>Safe and quick service for fans, switchboards and home wiring.</p>
              <div className="uc-feature-bottom">
                <span>Starting at ₹900</span>
                <Link to="/services">
                  View <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="uc-trust-strip">
        <div className="uc-trust-item">
          <h3>Verified professionals</h3>
          <p>Trusted service partners for every category</p>
        </div>
        <div className="uc-trust-item">
          <h3>Easy booking</h3>
          <p>Search, book and manage services in minutes</p>
        </div>
        <div className="uc-trust-item">
          <h3>Reliable support</h3>
          <p>Customer-friendly experience with fast assistance</p>
        </div>
      </section>
    </div>
  );
}

export default Home;