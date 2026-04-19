import { Link } from "react-router-dom";

const services = [
  { emoji: "✂️", name: "Haircut & Styling",  price: "₹499",   duration: "45 min",  category: "Beauty"       },
  { emoji: "🔧", name: "Home Plumbing",       price: "₹799",   duration: "90 min",  category: "Home"         },
  { emoji: "📚", name: "Private Tutor",       price: "₹350",   duration: "60 min",  category: "Education"    },
  { emoji: "💼", name: "Legal Consultation",  price: "₹1,200", duration: "60 min",  category: "Professional" },
  { emoji: "💻", name: "Tech Support",        price: "₹450",   duration: "60 min",  category: "Tech"         },
  { emoji: "🏠", name: "House Cleaning",      price: "₹599",   duration: "120 min", category: "Home"         },
];

const steps = [
  { num: "01", title: "Sign In",        desc: "Login instantly with Firebase. Secure and always synced." },
  { num: "02", title: "Pick a Service", desc: "Browse admin-curated services with pricing and duration."  },
  { num: "03", title: "Choose a Slot",  desc: "Select from live available time slots. Taken ones are locked." },
  { num: "04", title: "Confirm & Go",   desc: "Pay and get instant booking confirmation."                 },
];

export default function LandingPage() {
  return (
    <div className="landing-root">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          <Link to="/login"    className="btn-signin">Sign In</Link>
          <Link to="/register" className="btn-register">Create Account</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-inner">

          {/* LEFT */}
          <div className="lp-hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Now Live — Zero double-bookings
            </div>

            <h1 className="lp-h1">
              Book any<br />
              <span className="lp-h1-accent">service,</span><br />
              <span className="lp-h1-thin">instantly.</span>
            </h1>

            <p className="lp-hero-sub">
              Servify connects you with trusted professionals across beauty, home, education, tech, and more — with real-time slot availability.
            </p>

            <div className="lp-hero-ctas">
              <Link to="/register" className="btn-primary">Get Started Free →</Link>
              <Link to="/services" className="btn-outline">Explore Services</Link>
            </div>

            <div className="lp-stats">
              {[["2,400+", "Bookings"], ["16+", "Services"], ["98%", "On-time"]].map(([v, l]) => (
                <div key={l} className="lp-stat">
                  <div className="lp-stat-val">{v}</div>
                  <div className="lp-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — floating booking card */}
          <div className="lp-hero-right">
            <div className="lp-booking-card">
              <div className="lp-card-header">
                <span className="lp-card-emoji">✂️</span>
                <div>
                  <div className="lp-card-name">Haircut & Styling</div>
                  <div className="lp-card-meta">StyleCo Studio · ₹499</div>
                </div>
              </div>
              <div className="lp-card-label">Pick a slot — Today</div>
              <div className="lp-slots">
                {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((s, i) => (
                  <div key={s} className={`lp-slot ${i === 0 || i === 2 ? "lp-slot-taken" : ""} ${i === 3 ? "lp-slot-active" : ""}`}>
                    {s}
                    {(i === 0 || i === 2) && <span className="lp-slot-full">Full</span>}
                  </div>
                ))}
              </div>
              <div className="lp-confirm-btn">Confirm Booking — ₹499</div>
            </div>

            {/* floating badges */}
            <div className="lp-badge-confirmed">✅ Booking confirmed!</div>
            <div className="lp-badge-users">👥 1,200+ users this month</div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="lp-marquee-wrap">
        <div className="lp-marquee">
          {["Beauty ✦", "Plumbing ✦", "Education ✦", "Legal ✦", "Tech ✦", "Automotive ✦", "Cleaning ✦", "Fitness ✦",
            "Beauty ✦", "Plumbing ✦", "Education ✦", "Legal ✦", "Tech ✦", "Automotive ✦", "Cleaning ✦", "Fitness ✦"].map((t, i) => (
            <span key={i} className="lp-marquee-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section">
        <div className="lp-section-header">
          <div>
            <p className="section-label">Browse</p>
            <h2 className="section-title">Popular Services</h2>
            <p className="section-sub">All slots are live — pick what fits your schedule.</p>
          </div>
          <Link to="/services" className="btn-outline" style={{ alignSelf: "flex-end" }}>View All →</Link>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <Link to="/services" key={s.name} className="service-card lp-svc-link">
              <div className="card-emoji">{s.emoji}</div>
              <span className="svc-category-tag" style={{ marginBottom: "0.5rem", display: "inline-block" }}>{s.category}</span>
              <div className="card-name">{s.name}</div>
              <div className="card-footer">
                <span className="card-price">{s.price}</span>
                <span className="card-duration">{s.duration}</span>
              </div>
            </Link>
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

      {/* ── FEATURE HIGHLIGHTS ── */}
      <section className="section lp-features">
        <div className="lp-feat-big">
          <div className="lp-feat-icon">🔒</div>
          <h3>Zero double-bookings — guaranteed</h3>
          <p>Every slot is validated server-side before confirming. Two users can never book the same slot simultaneously.</p>
        </div>
        <div className="lp-feat-small-grid">
          {[
            ["🔥", "Firebase Auth",     "Secure login in seconds. Roles sync automatically."],
            ["🛡️", "Role-based Access", "Admins manage services. Users book them."],
            ["⚡", "Real-time Slots",   "Slot availability updates instantly across sessions."],
            ["📱", "Mobile Ready",      "Fully responsive — book from any device."],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="lp-feat-small">
              <div className="lp-feat-icon-sm">{emoji}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-section">
        <div className="cta-card">
          <h2 className="section-title">Ready to simplify<br />your bookings?</h2>
          <p className="section-sub" style={{ margin: "0 auto 2.5rem" }}>
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