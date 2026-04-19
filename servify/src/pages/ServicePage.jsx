import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser, getUserRole } from "../services/authService";
import { addService, getServices } from "../services/bookingService";

const STATIC_SERVICES = [
  { id: 1,  emoji: "✂️", category: "Beauty",       name: "Haircut & Styling",        desc: "Expert stylists for all hair types.",                  price: 499,  duration: "45 min",  rating: 4.9, bookings: 320 },
  { id: 2,  emoji: "💆", category: "Beauty",       name: "Spa & Massage",            desc: "Full body relaxation therapy by certified therapists.", price: 899,  duration: "60 min",  rating: 4.8, bookings: 210 },
  { id: 3,  emoji: "💅", category: "Beauty",       name: "Nail Art & Manicure",      desc: "Trending nail designs and classic manicure.",           price: 349,  duration: "40 min",  rating: 4.7, bookings: 180 },
  { id: 4,  emoji: "💼", category: "Professional", name: "Legal Consultation",       desc: "1-on-1 with a certified legal advisor.",                price: 1200, duration: "60 min",  rating: 4.9, bookings: 95  },
  { id: 5,  emoji: "📊", category: "Professional", name: "CA / Tax Filing",          desc: "File your ITR with expert CA guidance.",                price: 799,  duration: "45 min",  rating: 4.8, bookings: 140 },
  { id: 6,  emoji: "🎨", category: "Professional", name: "Graphic Design Session",   desc: "1-on-1 for logos, branding, or social media.",          price: 599,  duration: "60 min",  rating: 4.6, bookings: 88  },
  { id: 7,  emoji: "🔧", category: "Home",         name: "Home Plumbing",            desc: "Certified plumbers at your chosen time window.",         price: 799,  duration: "90 min",  rating: 4.7, bookings: 270 },
  { id: 8,  emoji: "⚡", category: "Home",         name: "Electrical Repair",        desc: "Safe electrical fixes for home or office.",             price: 649,  duration: "60 min",  rating: 4.8, bookings: 195 },
  { id: 9,  emoji: "🏠", category: "Home",         name: "Deep House Cleaning",      desc: "Top-to-bottom cleaning with eco-friendly products.",    price: 999,  duration: "180 min", rating: 4.9, bookings: 310 },
  { id: 10, emoji: "📚", category: "Education",    name: "Private Tutor",            desc: "Subject-specific tutors from Grade 1 to PG.",           price: 350,  duration: "60 min",  rating: 4.8, bookings: 420 },
  { id: 11, emoji: "💻", category: "Education",    name: "Coding Bootcamp (1-on-1)", desc: "Personalised sessions in Python, Web Dev, or DSA.",     price: 799,  duration: "90 min",  rating: 4.9, bookings: 230 },
  { id: 12, emoji: "🎸", category: "Education",    name: "Music Lessons",            desc: "Guitar, keyboard, or vocals by expert musicians.",       price: 499,  duration: "60 min",  rating: 4.7, bookings: 115 },
  { id: 13, emoji: "💻", category: "Tech",         name: "Tech Support",             desc: "Fix laptops, phones, and smart devices.",               price: 450,  duration: "60 min",  rating: 4.6, bookings: 175 },
  { id: 14, emoji: "📷", category: "Tech",         name: "CCTV Installation",        desc: "Home and office CCTV setup by trained technicians.",    price: 1499, duration: "120 min", rating: 4.8, bookings: 90  },
  { id: 15, emoji: "🚗", category: "Automotive",   name: "Car Wash & Detailing",     desc: "Full interior and exterior cleaning at doorstep.",      price: 599,  duration: "90 min",  rating: 4.7, bookings: 260 },
  { id: 16, emoji: "🔩", category: "Automotive",   name: "Bike / Car Servicing",     desc: "General servicing and oil change by mechanics.",        price: 899,  duration: "120 min", rating: 4.8, bookings: 145 },
];

const CATEGORIES = ["All", "Beauty", "Professional", "Home", "Education", "Tech", "Automotive"];

const EMPTY_FORM = { name: "", emoji: "🛠️", category: "Home", desc: "", price: "", duration: "" };

/* ── Add Service Modal ── */
function AddServiceModal({ onClose, onAdd, firebaseId }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.duration)
      return setError("Name, price and duration are required.");

    setLoading(true);
    setError("");
    try {
      const newService = await addService(firebaseId, {
        name:        form.name,
        emoji:       form.emoji,
        category:    form.category,
        description: form.desc,
        price:       Number(form.price),
        duration:    form.duration,
      });
      onAdd(newService); // add to list instantly
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h3 className="modal-title">Add New Service</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="input-group">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
            <input
              className="input-field"
              name="emoji"
              placeholder="Emoji e.g. ✂️"
              value={form.emoji}
              onChange={handle}
            />
            <select className="input-field" name="category" value={form.category} onChange={handle}>
              {["Beauty","Professional","Home","Education","Tech","Automotive"].map(c =>
                <option key={c}>{c}</option>
              )}
            </select>
          </div>

          <input
            className="input-field"
            name="name"
            placeholder="Service name"
            value={form.name}
            onChange={handle}
          />
          <input
            className="input-field"
            name="desc"
            placeholder="Short description"
            value={form.desc}
            onChange={handle}
          />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
            <input
              className="input-field"
              name="price"
              placeholder="Price in ₹"
              value={form.price}
              onChange={handle}
              type="number"
            />
            <input
              className="input-field"
              name="duration"
              placeholder="Duration e.g. 60 min"
              value={form.duration}
              onChange={handle}
            />
          </div>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding…" : "Add Service"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,         setSearch]         = useState("");
  const [user,           setUser]           = useState(null);
  const [isAdmin,        setIsAdmin]        = useState(false);
  const [showModal,      setShowModal]      = useState(false);
  const [dbServices,     setDbServices]     = useState([]); // services added by admin from MongoDB
  const navigate = useNavigate();

  /* Get logged in user + check role */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const role = await getUserRole(u.uid);
        setIsAdmin(role === "admin");
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  /* Load admin-added services from MongoDB */
  useEffect(() => {
    getServices().then(data => {
      if (Array.isArray(data)) setDbServices(data);
    });
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  /* Merge static + MongoDB services */
  const allServices = [
    ...STATIC_SERVICES,
    ...dbServices.map((s, i) => ({
      id:       `db-${s._id}`,
      emoji:    s.emoji     || "🛠️",
      category: s.category  || "General",
      name:     s.name,
      desc:     s.description || "",
      price:    s.price,
      duration: s.duration  || "",
      rating:   4.5,
      bookings: 0,
    })),
  ];

  const filtered = allServices.filter((s) => {
    const matchCat    = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-welcome">
                👋 Welcome back, <strong>{displayName}</strong>
                {isAdmin && <span className="admin-badge">Admin</span>}
              </span>
              <button className="btn-signin" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-signin">Sign In</Link>
              <Link to="/register" className="btn-register">Create Account</Link>
            </>
          )}
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div className="services-hero">
        <p className="section-label">Explore</p>
        <h1 className="services-hero-title">All Services</h1>
        <p className="services-hero-sub">
          {allServices.length} services across {CATEGORIES.length - 1} categories — pick your slot and book instantly.
        </p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search services..." value={search}
            onChange={(e) => setSearch(e.target.value)} className="search-input" />
        </div>
      </div>

      {/* FILTERS + ADMIN BUTTON */}
      <div className="filter-row">
        {CATEGORIES.map((cat) => (
          <button key={cat}
            className={`filter-btn ${activeCategory === cat ? "filter-btn-active" : ""}`}
            onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
        {isAdmin && (
          <button className="btn-add-service" onClick={() => setShowModal(true)}>
            + Add Service
          </button>
        )}
      </div>

      {/* RESULTS */}
      <div className="section" style={{ paddingTop:"1.5rem", paddingBottom:"0.5rem" }}>
        <p className="results-count">
          Showing <strong>{filtered.length}</strong> services
          {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
        </p>
      </div>

      {/* GRID */}
      <div className="section" style={{ paddingTop:"1.5rem" }}>
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
        </div>
      </footer>

      {/* ADMIN MODAL */}
      {showModal && (
        <AddServiceModal
          onClose={() => setShowModal(false)}
          onAdd={(newSvc) => setDbServices(prev => [...prev, newSvc])}
          firebaseId={user?.uid}
        />
      )}
    </div>
  );
}