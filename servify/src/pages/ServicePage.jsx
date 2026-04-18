import { Link } from "react-router-dom";
import { useState } from "react";

const ALL_SERVICES = [
  {
    id: 1, emoji: "✂️", category: "Beauty",
    name: "Haircut & Styling",
    desc: "Expert stylists for all hair types. Walk in fresh, walk out sharp.",
    price: 499, duration: "45 min", rating: 4.9, bookings: 320,
  },
  {
    id: 2, emoji: "💆", category: "Beauty",
    name: "Spa & Massage",
    desc: "Full body relaxation therapy by certified therapists.",
    price: 899, duration: "60 min", rating: 4.8, bookings: 210,
  },
  {
    id: 3, emoji: "💅", category: "Beauty",
    name: "Nail Art & Manicure",
    desc: "Trending nail designs and classic manicure by professionals.",
    price: 349, duration: "40 min", rating: 4.7, bookings: 180,
  },
  {
    id: 4, emoji: "💼", category: "Professional",
    name: "Legal Consultation",
    desc: "1-on-1 session with a certified legal advisor for any matter.",
    price: 1200, duration: "60 min", rating: 4.9, bookings: 95,
  },
  {
    id: 5, emoji: "📊", category: "Professional",
    name: "CA / Tax Filing",
    desc: "File your ITR and get expert tax advice from a chartered accountant.",
    price: 799, duration: "45 min", rating: 4.8, bookings: 140,
  },
  {
    id: 6, emoji: "🎨", category: "Professional",
    name: "Graphic Design Session",
    desc: "Work 1-on-1 with a designer for logos, branding, or social media.",
    price: 599, duration: "60 min", rating: 4.6, bookings: 88,
  },
  {
    id: 7, emoji: "🔧", category: "Home",
    name: "Home Plumbing",
    desc: "Certified plumbers dispatched within your chosen time window.",
    price: 799, duration: "90 min", rating: 4.7, bookings: 270,
  },
  {
    id: 8, emoji: "⚡", category: "Home",
    name: "Electrical Repair",
    desc: "Safe, certified electrical fixes for your home or office.",
    price: 649, duration: "60 min", rating: 4.8, bookings: 195,
  },
  {
    id: 9, emoji: "🏠", category: "Home",
    name: "Deep House Cleaning",
    desc: "Top-to-bottom cleaning with eco-friendly products.",
    price: 999, duration: "180 min", rating: 4.9, bookings: 310,
  },
  {
    id: 10, emoji: "📚", category: "Education",
    name: "Private Tutor",
    desc: "Subject-specific tutors for students from Grade 1 to PG.",
    price: 350, duration: "60 min", rating: 4.8, bookings: 420,
  },
  {
    id: 11, emoji: "💻", category: "Education",
    name: "Coding Bootcamp (1-on-1)",
    desc: "Personalised coding sessions in Python, Web Dev, or DSA.",
    price: 799, duration: "90 min", rating: 4.9, bookings: 230,
  },
  {
    id: 12, emoji: "🎸", category: "Education",
    name: "Music Lessons",
    desc: "Guitar, keyboard, or vocals — learn from experienced musicians.",
    price: 499, duration: "60 min", rating: 4.7, bookings: 115,
  },
  {
    id: 13, emoji: "💻", category: "Tech",
    name: "Tech Support",
    desc: "Fix laptops, phones, and smart devices with a certified pro.",
    price: 450, duration: "60 min", rating: 4.6, bookings: 175,
  },
  {
    id: 14, emoji: "📷", category: "Tech",
    name: "CCTV Installation",
    desc: "Home and office CCTV setup by trained technicians.",
    price: 1499, duration: "120 min", rating: 4.8, bookings: 90,
  },
  {
    id: 15, emoji: "🚗", category: "Automotive",
    name: "Car Wash & Detailing",
    desc: "Full interior and exterior car cleaning at your doorstep.",
    price: 599, duration: "90 min", rating: 4.7, bookings: 260,
  },
  {
    id: 16, emoji: "🔩", category: "Automotive",
    name: "Bike / Car Servicing",
    desc: "General vehicle servicing and oil change by certified mechanics.",
    price: 899, duration: "120 min", rating: 4.8, bookings: 145,
  },
];

const CATEGORIES = ["All", "Beauty", "Professional", "Home", "Education", "Tech", "Automotive"];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ALL_SERVICES.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          <Link to="/login"    className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-register">Create Account</Link>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div className="services-hero">
        <p className="section-label">Explore</p>
        <h1 className="services-hero-title">All Services</h1>
        <p className="services-hero-sub">
          {ALL_SERVICES.length} services across {CATEGORIES.length - 1} categories — pick your slot and book instantly.
        </p>

        {/* SEARCH */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="filter-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "filter-btn-active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESULTS COUNT */}
      <div className="section" style={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }}>
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> services
          {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="section" style={{ paddingTop: "1.5rem" }}>
        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-emoji">🔎</div>
            <h3>No services found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="services-grid-full">
            {filtered.map((s) => (
              <div className="svc-card-full" key={s.id}>
                <div className="svc-card-top">
                  <div className="svc-emoji-badge">{s.emoji}</div>
                  <span className="svc-category-tag">{s.category}</span>
                </div>
                <h3 className="svc-card-name">{s.name}</h3>
                <p className="svc-card-desc">{s.desc}</p>
                <div className="svc-card-meta">
                  <span className="svc-rating">⭐ {s.rating}</span>
                  <span className="svc-bookings">{s.bookings}+ booked</span>
                </div>
                <div className="svc-card-footer">
                  <div>
                    <div className="svc-price">₹{s.price}</div>
                    <div className="svc-duration">⏱ {s.duration}</div>
                  </div>
                  <Link to={`/book/${s.id}`} className="btn-book">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <span>Built for Hackathon 2025 · MERN + Firebase</span>
        <div className="footer-links">
          <a href="https://github.com">GitHub</a>
          <a href="#">Docs</a>
        </div>
      </footer>

    </div>
  );
}