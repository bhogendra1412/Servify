import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { getTakenSlots, createBooking } from "../services/bookingService";
import "../styles/global.css";

const ALL_SERVICES = [
  { id: 1,  emoji: "✂️", category: "Beauty",       name: "Haircut & Styling",        desc: "Expert stylists for all hair types. Walk in fresh, walk out sharp.",        price: 499,  duration: "45 min"  },
  { id: 2,  emoji: "💆", category: "Beauty",       name: "Spa & Massage",            desc: "Full body relaxation therapy by certified therapists.",                      price: 899,  duration: "60 min"  },
  { id: 3,  emoji: "💅", category: "Beauty",       name: "Nail Art & Manicure",      desc: "Trending nail designs and classic manicure by professionals.",               price: 349,  duration: "40 min"  },
  { id: 4,  emoji: "💼", category: "Professional", name: "Legal Consultation",       desc: "1-on-1 session with a certified legal advisor for any matter.",              price: 1200, duration: "60 min"  },
  { id: 5,  emoji: "📊", category: "Professional", name: "CA / Tax Filing",          desc: "File your ITR and get expert tax advice from a chartered accountant.",       price: 799,  duration: "45 min"  },
  { id: 6,  emoji: "🎨", category: "Professional", name: "Graphic Design Session",   desc: "Work 1-on-1 with a designer for logos, branding, or social media.",          price: 599,  duration: "60 min"  },
  { id: 7,  emoji: "🔧", category: "Home",         name: "Home Plumbing",            desc: "Certified plumbers dispatched within your chosen time window.",              price: 799,  duration: "90 min"  },
  { id: 8,  emoji: "⚡", category: "Home",         name: "Electrical Repair",        desc: "Safe, certified electrical fixes for your home or office.",                  price: 649,  duration: "60 min"  },
  { id: 9,  emoji: "🏠", category: "Home",         name: "Deep House Cleaning",      desc: "Top-to-bottom cleaning with eco-friendly products.",                         price: 999,  duration: "180 min" },
  { id: 10, emoji: "📚", category: "Education",    name: "Private Tutor",            desc: "Subject-specific tutors for students from Grade 1 to PG.",                  price: 350,  duration: "60 min"  },
  { id: 11, emoji: "💻", category: "Education",    name: "Coding Bootcamp (1-on-1)", desc: "Personalised coding sessions in Python, Web Dev, or DSA.",                  price: 799,  duration: "90 min"  },
  { id: 12, emoji: "🎸", category: "Education",    name: "Music Lessons",            desc: "Guitar, keyboard, or vocals — learn from experienced musicians.",            price: 499,  duration: "60 min"  },
  { id: 13, emoji: "💻", category: "Tech",         name: "Tech Support",             desc: "Fix laptops, phones, and smart devices with a certified pro.",               price: 450,  duration: "60 min"  },
  { id: 14, emoji: "📷", category: "Tech",         name: "CCTV Installation",        desc: "Home and office CCTV setup by trained technicians.",                         price: 1499, duration: "120 min" },
  { id: 15, emoji: "🚗", category: "Automotive",   name: "Car Wash & Detailing",     desc: "Full interior and exterior car cleaning at your doorstep.",                  price: 599,  duration: "90 min"  },
  { id: 16, emoji: "🔩", category: "Automotive",   name: "Bike / Car Servicing",     desc: "General vehicle servicing and oil change by certified mechanics.",           price: 899,  duration: "120 min" },
];

const ALL_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW    = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function Calendar({ selectedDate, onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0);  setViewYear(y => y+1); } else setViewMonth(m => m+1); };

  return (
    <div>
      <div className="bk-cal-header">
        <span className="bk-cal-month">{MONTHS[viewMonth]} {viewYear}</span>
        <div style={{ display:"flex", gap:"6px" }}>
          <button className="bk-cal-nav" onClick={prevMonth}>‹</button>
          <button className="bk-cal-nav" onClick={nextMonth}>›</button>
        </div>
      </div>
      <div className="bk-cal-grid">
        {DOW.map(d => <div key={d} className="bk-cal-dow">{d}</div>)}
        {Array(firstDay).fill(null).map((_,i) => <div key={`e${i}`}/>)}
        {Array.from({ length: daysInMonth }, (_,i) => {
          const d  = i + 1;
          const dt = new Date(viewYear, viewMonth, d);
          const isPast     = dt < today;
          const isToday    = dt.getTime() === today.getTime();
          const isSelected = selectedDate && dt.getTime() === selectedDate.getTime();
          let cls = "bk-cal-day";
          if (isPast)       cls += " bk-cal-past";
          else if (isSelected) cls += " bk-cal-selected";
          else if (isToday) cls += " bk-cal-today";
          return (
            <div key={d} className={cls} onClick={() => !isPast && onSelect(dt)}>{d}</div>
          );
        })}
      </div>
      <div className="bk-legend">
        <span><span className="bk-dot bk-dot-today"/>Today</span>
        <span><span className="bk-dot bk-dot-selected"/>Selected</span>
        <span><span className="bk-dot bk-dot-past"/>Past</span>
      </div>
    </div>
  );
}

export default function BookingPage() {
  const { id }   = useParams();
  const service  = ALL_SERVICES.find(s => s.id === Number(id));

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [takenSlots,   setTakenSlots]   = useState([]);
  const [booked,       setBooked]       = useState(false);
  const [error,        setError]        = useState("");
  const [currentUser,  setCurrentUser]  = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Get logged in Firebase user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  // Fetch real taken slots from MongoDB when date changes
  useEffect(() => {
    if (!selectedDate || !service) return;
    const dateStr = selectedDate.toISOString().split("T")[0]; // "2025-04-19"
    setLoadingSlots(true);
    getTakenSlots(String(service.id), dateStr)
      .then(slots => setTakenSlots(slots))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  if (!service) return (
    <div style={{ textAlign:"center", padding:"6rem 2rem" }}>
      <p style={{ fontSize:"3rem" }}>❓</p>
      <h2>Service not found</h2>
      <Link to="/services" className="btn-book" style={{ marginTop:"1rem", display:"inline-block" }}>
        Back to Services
      </Link>
    </div>
  );

  const handleDateSelect = (dt) => {
    if (booked) return;
    setSelectedDate(dt);
    setSelectedSlot(null);
    setError("");
  };

  const handleBook = async () => {
    if (!selectedDate) { setError("Please select a date first."); return; }
    if (!selectedSlot) { setError("Please select a time slot.");  return; }
    if (!currentUser)  { setError("Please login to book a slot."); return; }

    setError("");
    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      await createBooking({
        firebaseId: currentUser.uid,
        serviceId:  String(service.id),
        date:       dateStr,
        timeSlot:   selectedSlot,
      });
      setBooked(true);
    } catch (err) {
      setError(err.message); // "Slot already booked" from backend
    }
  };

  const formattedDate = selectedDate
    ? `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    : null;

  const displayName = currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <div className="nav-actions">
          {currentUser
            ? <p className="nav-welcome">👋 Welcome, <strong>{displayName}</strong></p>
            : <><Link to="/login" className="btn-signin">Sign In</Link>
               <Link to="/register" className="btn-register">Create Account</Link></>
          }
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="booking-breadcrumb">
        <Link to="/services">Services</Link> › {service.name} › Book
      </div>

      {/* LAYOUT */}
      <div className="booking-layout">

        {/* LEFT COLUMN */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>

          {/* CALENDAR */}
          <div className="booking-panel">
            <p className="section-label">Step 1 — Date</p>
            <h2 className="booking-panel-title">
              {selectedDate ? formattedDate : "Pick a date"}
            </h2>
            <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
          </div>

          {/* SLOTS */}
          <div className="booking-panel">
            <p className="section-label">Step 2 — Time</p>
            <h2 className="booking-panel-title">
              {selectedSlot ? selectedSlot : "Select a time slot"}
            </h2>

            {!selectedDate ? (
              <p className="bk-hint">Select a date above to see available slots.</p>
            ) : loadingSlots ? (
              <p className="bk-hint">Loading slots…</p>
            ) : (
              <>
                <div className="slots-grid">
                  {ALL_SLOTS.map(slot => {
                    const isTaken    = takenSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    let cls = "slot-btn";
                    if (isTaken)      cls += " slot-taken";
                    else if (isSelected) cls += " slot-btn-active";
                    return (
                      <button key={slot} className={cls}
                        onClick={() => { if (!isTaken && !booked) { setSelectedSlot(slot); setError(""); } }}
                        disabled={isTaken || booked}>
                        {slot}
                        {isTaken && <span className="taken-badge">Full</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="bk-legend">
                  <span><span className="bk-dot bk-dot-avail"/>Available</span>
                  <span><span className="bk-dot bk-dot-selected"/>Selected</span>
                  <span><span className="bk-dot bk-dot-taken"/>Taken</span>
                </div>
              </>
            )}

            {error && <p className="booking-error">{error}</p>}

            {booked ? (
              <div className="booking-success">
                <span className="booking-success-icon">✅</span>
                <div>
                  <p className="booking-success-title">Booking Confirmed!</p>
                  <p className="booking-success-sub">
                    Your slot at <strong>{selectedSlot}</strong> on <strong>{formattedDate}</strong> is booked.
                  </p>
                </div>
              </div>
            ) : (
              <button className="btn-book-main" onClick={handleBook}>
                Book Slot
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN — SERVICE SUMMARY */}
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
              <div className="bsc-divider"/>
              <div className="bsc-meta-item">
                <span className="bsc-meta-label">Duration</span>
                <span className="bsc-meta-val">{service.duration}</span>
              </div>
            </div>

            <p className="section-label" style={{ marginTop:"1.25rem", marginBottom:"0.6rem" }}>Booking summary</p>
            <div className="bk-summary">
              <div className="bk-summary-row">
                <span className="bk-summary-lbl">Date</span>
                <span className={`bk-summary-val ${!selectedDate ? "bk-summary-pending":""}`}>
                  {formattedDate || "Not selected"}
                </span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-summary-lbl">Time</span>
                <span className={`bk-summary-val ${!selectedSlot ? "bk-summary-pending":""}`}>
                  {selectedSlot || "Not selected"}
                </span>
              </div>
              <div className="bk-summary-row">
                <span className="bk-summary-lbl">Service</span>
                <span className="bk-summary-val">{service.name}</span>
              </div>
              <div className="bk-summary-row bk-summary-total">
                <span className="bk-summary-lbl">Total</span>
                <span className="bk-summary-val">₹{service.price}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <Link to="/" className="logo">Servi<span>fy</span></Link>
        <span>Built for Hackathon 2025 · MERN + Firebase</span>
        <div className="footer-links"><a href="https://github.com">GitHub</a></div>
      </footer>
    </div>
  );
}