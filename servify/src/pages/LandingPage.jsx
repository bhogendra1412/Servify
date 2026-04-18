import { Link } from "react-router-dom";
import "../styles/global.css";

const services = [
  { emoji: "✂️", name: "Haircut & Styling",    desc: "Expert stylists, zero wait times.",           price: "₹499",   duration: "45 min"  },
  { emoji: "💼", name: "Legal Consultation",   desc: "1-on-1 session with a certified advisor.",    price: "₹1,200", duration: "60 min"  },
  { emoji: "🔧", name: "Home Plumbing",        desc: "Certified plumbers at your doorstep.",        price: "₹799",   duration: "90 min"  },
  { emoji: "📚", name: "Private Tutor",        desc: "Subject experts for students of all grades.", price: "₹350",   duration: "60 min"  },
  { emoji: "🏠", name: "House Cleaning",       desc: "Deep clean done right, every time.",          price: "₹599",   duration: "120 min" },
  { emoji: "💻", name: "Tech Support",         desc: "Fix your devices with a pro.",               price: "₹450",   duration: "60 min"  },
];

const steps = [
  { title: "Sign In",         desc: "Login instantly with Firebase. Secure and always synced." },
  { title: "Pick a Service",  desc: "Browse admin-curated services with pricing and duration." },
  { title: "Choose a Slot",   desc: "Select from live available time slots. Taken ones are locked." },
  { title: "Confirm & Go",    desc: "Pay and get instant booking confirmation." },
];

export default function LandingPage() {
  return (
    <div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          <Link to="/login"    className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-register">Create Account</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Now Live — Book Any Service Instantly
        </div>

        <h1>
          <span className="line-muted">The Easiest Way</span>
          <span className="line-main">to Book Any</span>
          <span className="line-accent">Service.</span>
        </h1>

        <p className="hero-sub">
          Browse services, pick a time slot, and confirm — all in under a minute.
          No conflicts. No double-bookings. Ever.
        </p>

        <div className="hero-ctas">
          <Link to="/services" className="btn-outline">Browse Services</Link>
        </div>

        <div className="hero-stats">
          {[["2,400+", "Bookings Made"], ["50+", "Services Listed"], ["98%", "On-time Rate"]].map(
            ([val, lbl]) => (
              <div className="stat" key={lbl}>
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services">
        <p className="section-label">Browse</p>
        <h2 className="section-title">Popular Services</h2>
        <p className="section-sub">
          All slots are live — pick what fits your schedule.
        </p>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.name}>
              <div className="card-emoji">{s.emoji}</div>
              <div className="card-name">{s.name}</div>
              <div className="card-desc">{s.desc}</div>
              <div className="card-footer">
                <span className="card-price">{s.price}</span>
                <span className="card-duration">{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <div className="how-section">
        <div className="how-card">
          <p className="section-label" style={{ color: "rgba(255,255,255,0.45)" }}>Process</p>
          <h2 className="section-title" style={{ color: "#fff" }}>Four steps to booked</h2>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-num">{i + 1}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="cta-card">
          <h2 className="section-title">Ready to simplify<br />your bookings?</h2>
          <p className="section-sub">
            Join Servify and experience conflict-free scheduling today.
          </p>
          <div className="cta-btns">
            <Link to="/register" className="btn-white">Create Free Account</Link>
            <Link to="/login"    className="btn-white-outline">Sign In</Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="logo">Servi<span>fy</span></span>
        <div className="footer-links">
          <a href="https://github.com">GitHub</a>
          <a href="#">Docs</a>
        </div>
      </footer>

    </div>
  );
}