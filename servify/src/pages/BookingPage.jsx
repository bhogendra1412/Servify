import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/global.css";

const ALL_SERVICES = [
  { id: 1,  emoji: "✂️", category: "Beauty",       name: "Haircut & Styling",        desc: "Expert stylists for all hair types. Walk in fresh, walk out sharp.",          price: 499,  duration: "45 min"  },
  { id: 2,  emoji: "💆", category: "Beauty",       name: "Spa & Massage",            desc: "Full body relaxation therapy by certified therapists.",                        price: 899,  duration: "60 min"  },
  { id: 3,  emoji: "💅", category: "Beauty",       name: "Nail Art & Manicure",      desc: "Trending nail designs and classic manicure by professionals.",                 price: 349,  duration: "40 min"  },
  { id: 4,  emoji: "💼", category: "Professional", name: "Legal Consultation",       desc: "1-on-1 session with a certified legal advisor for any matter.",                price: 1200, duration: "60 min"  },
  { id: 5,  emoji: "📊", category: "Professional", name: "CA / Tax Filing",          desc: "File your ITR and get expert tax advice from a chartered accountant.",         price: 799,  duration: "45 min"  },
  { id: 6,  emoji: "🎨", category: "Professional", name: "Graphic Design Session",   desc: "Work 1-on-1 with a designer for logos, branding, or social media.",            price: 599,  duration: "60 min"  },
  { id: 7,  emoji: "🔧", category: "Home",         name: "Home Plumbing",            desc: "Certified plumbers dispatched within your chosen time window.",                price: 799,  duration: "90 min"  },
  { id: 8,  emoji: "⚡", category: "Home",         name: "Electrical Repair",        desc: "Safe, certified electrical fixes for your home or office.",                    price: 649,  duration: "60 min"  },
  { id: 9,  emoji: "🏠", category: "Home",         name: "Deep House Cleaning",      desc: "Top-to-bottom cleaning with eco-friendly products.",                           price: 999,  duration: "180 min" },
  { id: 10, emoji: "📚", category: "Education",    name: "Private Tutor",            desc: "Subject-specific tutors for students from Grade 1 to PG.",                    price: 350,  duration: "60 min"  },
  { id: 11, emoji: "💻", category: "Education",    name: "Coding Bootcamp (1-on-1)", desc: "Personalised coding sessions in Python, Web Dev, or DSA.",                    price: 799,  duration: "90 min"  },
  { id: 12, emoji: "🎸", category: "Education",    name: "Music Lessons",            desc: "Guitar, keyboard, or vocals — learn from experienced musicians.",              price: 499,  duration: "60 min"  },
  { id: 13, emoji: "💻", category: "Tech",         name: "Tech Support",             desc: "Fix laptops, phones, and smart devices with a certified pro.",                 price: 450,  duration: "60 min"  },
  { id: 14, emoji: "📷", category: "Tech",         name: "CCTV Installation",        desc: "Home and office CCTV setup by trained technicians.",                           price: 1499, duration: "120 min" },
  { id: 15, emoji: "🚗", category: "Automotive",   name: "Car Wash & Detailing",     desc: "Full interior and exterior car cleaning at your doorstep.",                    price: 599,  duration: "90 min"  },
  { id: 16, emoji: "🔩", category: "Automotive",   name: "Bike / Car Servicing",     desc: "General vehicle servicing and oil change by certified mechanics.",             price: 899,  duration: "120 min" },
];

const SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const user = { name: "Pavan" };   // replace with Firebase user later

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = ALL_SERVICES.find((s) => s.id === Number(id));

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");

  if (!service) {
    return (
      <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
        <p style={{ fontSize: "3rem" }}>❓</p>
        <h2>Service not found</h2>
        <Link to="/services" className="btn-book" style={{ marginTop: "1rem", display: "inline-block" }}>Back to Services</Link>
      </div>
    );
  }

  const handleBook = () => {
    if (!selectedSlot) {
      setError("Please select a time slot before booking.");
      return;
    }
    setError("");
    setBooked(true);
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          {user ? (
            <p className="nav-welcome">Welcome back, {user.name} 👋</p>
          ) : (
            <>
              <Link to="/login"    className="btn-signin">Sign In</Link>
              <Link to="/register" className="btn-register">Create Account</Link>
            </>
          )}
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="booking-breadcrumb">
        <Link to="/services">Services</Link> {'>'} {service.name}
      </div>

      {/* MAIN LAYOUT */}
      <div className="booking-layout">

        {/* LEFT — SLOTS */}
        <div className="booking-slots-panel">
          <p className="section-label">Select a Slot</p>
          <h2 className="booking-panel-title">Available Times</h2>
          <div className="slots-grid">
            {SLOTS.map((slot) => (
              <button
                key={slot}
                className={`slot-btn ${selectedSlot === slot ? "slot-btn-active" : ""} ${booked ? "slot-btn-disabled" : ""}`}
                onClick={() => { if (!booked) { setSelectedSlot(slot); setError(""); } }}
                disabled={booked}
              >
                {slot}
              </button>
            ))}
          </div>

          {error && <p className="booking-error">{error}</p>}

          {booked ? (
            <div className="booking-success">
              <span className="booking-success-icon">✅</span>
              <div>
                <p className="booking-success-title">Booking Confirmed!</p>
                <p className="booking-success-sub">Your slot at <strong>{selectedSlot}</strong> is booked.</p>
              </div>
            </div>
          ) : (
            <button className="btn-book-main" onClick={handleBook}>
              Book Slot
            </button>
          )}
        </div>

        {/* RIGHT — SERVICE INFO */}
        <div className="booking-service-panel">
          <div className="booking-service-card">
            <div className="bsc-emoji">{service.emoji}</div>
            <span className="svc-category-tag">{service.category}</span>
            <h2 className="bsc-name">{service.name}</h2>
            <p className="bsc-desc">{service.desc}</p>
            <div className="bsc-meta">
              <div className="bsc-meta-item">
                <span className="bsc-meta-label">Price</span>
                <span className="bsc-meta-val">₹{service.price}</span>
              </div>
              <div className="bsc-divider" />
              <div className="bsc-meta-item">
                <span className="bsc-meta-label">Duration</span>
                <span className="bsc-meta-val">{service.duration}</span>
              </div>
            </div>
          </div>
        </div>

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