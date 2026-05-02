import { useState } from "react";
import { LogoMark, SearchIcon } from "./Brand.jsx";
import { normalizeSearch, sortLocationsForSearch } from "../utils/search.js";
import { PARKIQ_MERCHANT_UPI_ID } from "../utils/booking.js";

export function Navbar({ user, go, logout, theme, toggleTheme, searchQuery, setSearchQuery, locations, adminMode = false }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cleanQuery = normalizeSearch(searchQuery);
  const suggestions = cleanQuery ? sortLocationsForSearch(locations, cleanQuery).slice(0, 5) : [];
  const jump = (id) => {
    go("home");
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const chooseSuggestion = (loc) => {
    setSearchQuery(loc.name);
    setShowSuggestions(false);
    go("home");
    window.setTimeout(() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "var(--nav-bg)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ width: "min(100%, 1320px)", margin: "0 auto", minHeight: 64, padding: ".65rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div className="nav-left">
          <button onClick={() => go(adminMode ? "admin" : "home")} style={{ background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
            <LogoMark />
            <span style={{ fontSize: "1.25rem", fontWeight: 800 }}>{adminMode ? "ParkIQ Admin" : "ParkIQ"}</span>
          </button>
          {!adminMode && (
            <div className="quick-nav" aria-label="Quick navigation">
              <button className="quick-link" onClick={() => jump("home-top")}>Home</button>
              <button className="quick-link" onClick={() => jump("policies")}>Policies</button>
              <button className="quick-link" onClick={() => jump("about")}>About us</button>
            </div>
          )}
        </div>
        {!adminMode && (
          <div className="search-wrap">
            <label className="search-box" aria-label="Search parking locations">
              <SearchIcon />
              <input
                value={searchQuery}
                onFocus={() => {
                  setShowSuggestions(true);
                  go("home");
                }}
                onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                  go("home");
                }}
                placeholder="Search locations"
              />
            </label>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions" role="listbox" aria-label="Location suggestions">
                {suggestions.map((loc) => (
                  <button key={loc.id} className="suggestion-btn" onMouseDown={() => chooseSuggestion(loc)} type="button">
                    <strong>{loc.name}</strong>
                    <span>{loc.address}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="btn-s" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          {user ? (
            <>
              <span className="muted" style={{ fontSize: ".9rem" }}>{user.name}</span>
              {!adminMode && (user.role === "admin" ? <button className="btn-s" onClick={() => go("admin")}>Admin</button> : <button className="btn-s" onClick={() => go("dashboard")}>Bookings</button>)}
              <button className="btn-s" onClick={logout}>Logout</button>
            </>
          ) : <button className="btn-p" onClick={() => go("auth")}>Sign in</button>}
        </div>
      </div>
    </nav>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  const bg = toast.type === "err" ? "var(--red)" : toast.type === "info" ? "var(--info)" : "var(--green)";
  return <div style={{ position: "fixed", top: 88, right: 18, zIndex: 99, color: "white", background: bg, borderRadius: 16, padding: ".9rem 1rem", boxShadow: "var(--shadow)", fontWeight: 800 }}>{toast.msg}</div>;
}

function SocialIcon({ name }) {
  const paths = {
    instagram: (
      <>
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Z" />
        <path d="M12 7.1A4.9 4.9 0 1 1 12 17a4.9 4.9 0 0 1 0-9.9Zm0 2A2.9 2.9 0 1 0 12 15a2.9 2.9 0 0 0 0-5.9ZM17.3 6.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
      </>
    ),
    facebook: <path d="M14 8.6V6.8c0-.9.3-1.4 1.5-1.4H18V2.2C17.6 2.1 16.4 2 15 2c-3 0-5 1.8-5 5.1v1.5H7v3.6h3V22h4v-9.8h3.3l.5-3.6H14Z" />,
    twitter: <path d="M18.2 2.8h3.3l-7.1 8.1 8.4 10.3h-6.6l-5.1-6.3-5.9 6.3H1.9l7.6-8.6-8-9.8h6.8l4.6 5.7 5.3-5.7Zm-1.2 16.6h1.8L7.3 4.5h-2l11.7 14.9Z" />,
    linkedin: <path d="M4.7 3.1a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3 9h3.4v12H3V9Zm6 0h3.3v1.6h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.5 4.4 5.6V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9V9Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const FAQ_POINTS = {
  "What is the best parking app near me?": [
    "ParkIQ helps you find nearby parking locations quickly.",
    "Compare availability, slot count, and location type before booking.",
  ],
  "How does ParkIQ parking work?": [
    "Choose a location, select an available slot, and confirm your booking.",
    "A booking ID is generated instantly for entry verification.",
  ],
  "Where can I find a car park for rent?": [
    "Use the search bar to discover visible and hidden parking locations.",
    "Search works by location name, address, and category.",
  ],
  "What are the campus parking rules?": [
    "Use only available slots shown in ParkIQ.",
    "Keep your booking ID ready at the entry point.",
  ],
  "Can I pre-book parking before I arrive?": [
    "Yes, choose your parking date and arrival/departure time.",
    "The slot is marked booked after confirmation.",
  ],
  "How can I check my booking status?": [
    "Open My Bookings after signing in.",
    "Confirmed and cancelled bookings are shown separately.",
  ],
  "Can a parking booking be cancelled?": [
    "Yes, confirmed bookings can be cancelled from My Bookings.",
    "The slot becomes available again after cancellation.",
  ],
  "How do I pay using the ParkIQ merchant UPI ID?": [
    `Use ${PARKIQ_MERCHANT_UPI_ID} during checkout.`,
    "Mark payment successful before confirming the booking.",
  ],
  "Can I search for hidden parking locations?": [
    "Yes, extra locations stay hidden from the default grid.",
    "Typing in search reveals all matching locations.",
  ],
  "What happens if a selected slot becomes unavailable?": [
    "Booked slots cannot be selected.",
    "Pick another available slot from the same location.",
  ],
  "Can admins add new parking locations?": [
    "Admins can add location name, address, and slot count.",
    "ParkIQ generates slots automatically for the new location.",
  ],
  "Is my booking ID generated instantly?": [
    "Yes, every confirmed booking receives an instant booking ID.",
    "Show the booking ID at the parking entry point.",
  ],
};

const SOCIAL_IDS = {
  instagram: "@parkiq.app",
  facebook: "ParkIQ Official",
  twitter: "@ParkIQApp",
  linkedin: "ParkIQ",
};

export function Footer({ go, notify }) {
  const [openFaq, setOpenFaq] = useState(null);
  const jump = (id) => {
    go("home");
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <section className="faq-section">
          <h2 className="display" style={{ textAlign: "center", fontSize: "1.35rem" }}>FAQ's About Car Parking</h2>
          <div className="faq-list">
            {[
              "What is the best parking app near me?",
              "How does ParkIQ parking work?",
              "Where can I find a car park for rent?",
              "What are the campus parking rules?",
              "Can I pre-book parking before I arrive?",
              "How can I check my booking status?",
              "Can a parking booking be cancelled?",
              "How do I pay using the ParkIQ merchant UPI ID?",
              "Can I search for hidden parking locations?",
              "What happens if a selected slot becomes unavailable?",
              "Can admins add new parking locations?",
              "Is my booking ID generated instantly?",
            ].map((question) => (
              <div key={question} className="faq-item">
                <button
                  className="faq-row"
                  aria-expanded={openFaq === question}
                  onClick={() => setOpenFaq((current) => current === question ? null : question)}
                >
                  <span>{question}</span>
                  <span aria-hidden="true">{openFaq === question ? "-" : "+"}</span>
                </button>
                {openFaq === question && (
                  <div className="faq-answer">
                    {(FAQ_POINTS[question] || []).map((point) => <span key={point}>{point}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="footer-grid">
          <section id="about">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: ".8rem" }}>
              <LogoMark />
              <strong style={{ fontSize: "1.25rem" }}>ParkIQ</strong>
            </div>
            <p className="muted" style={{ lineHeight: 1.65, maxWidth: 360 }}>ParkIQ helps drivers discover, reserve, and manage parking around campuses, hospitals, malls, offices, and transit hubs.</p>
            <div className="about-points">
              <span>Built for quick parking discovery around busy city and campus areas.</span>
              <span>Shows live-style availability, total slots, and location categories.</span>
              <span>Supports booking management, UPI checkout, and quick parking discovery.</span>
              <span>Includes admin tools for adding new parking locations and slots.</span>
            </div>
            <div className="footer-social" aria-label="Social links">
              {["instagram", "facebook", "twitter", "linkedin"].map((name) => (
                <button
                  key={name}
                  className="social-dot"
                  aria-label={`${name} ID`}
                  onClick={() => notify(`${name[0].toUpperCase() + name.slice(1)}: ${SOCIAL_IDS[name]}`, "info")}
                >
                  <SocialIcon name={name} />
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ marginBottom: ".85rem" }}>Quick Links</h3>
            <ul className="footer-list">
              <li><button className="quick-link" onClick={() => jump("home-top")}>Home</button></li>
              <li><button className="quick-link" onClick={() => jump("locations")}>Find Parking</button></li>
              <li><button className="quick-link" onClick={() => go("auth")}>Sign In</button></li>
              <li><button className="quick-link" onClick={() => go("dashboard")}>My Bookings</button></li>
              <li><button className="quick-link" onClick={() => go("admin")}>Admin Console</button></li>
            </ul>
          </section>

          <section id="policies">
            <h3 style={{ marginBottom: ".85rem" }}>Products</h3>
            <ul className="footer-list">
              <li>New Cars</li>
              <li>Car Insurance</li>
              <li>Parking Solutions</li>
              <li>Fuel Price</li>
              <li>Vehicle Owner Details</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </section>
        </div>

        <section className="reach-us" aria-label="Reach us">
          <h2 className="display" style={{ fontSize: "1.45rem" }}>Reach us</h2>
          <div className="reach-row">
            <span className="reach-icon">Email</span>
            <p>For support: <strong>support@parkiq.com</strong></p>
          </div>
          <div className="reach-row">
            <span className="reach-icon">Email</span>
            <p>For Business: <strong>sales@parkiq.com</strong></p>
          </div>
          <div className="reach-row">
            <span className="reach-icon">Pin</span>
            <p>SRM University AP, Neerukonda, Amaravati, Andhra Pradesh 522240</p>
          </div>
        </section>

        <div className="app-strip">
          <div className="download-copy">
            <h2 className="display" style={{ fontSize: "2rem", marginBottom: ".55rem" }}>Download ParkIQ app</h2>
            <p className="muted" style={{ lineHeight: 1.55, maxWidth: 560 }}>Stay on top of your parking needs with ParkIQ. Reserve slots, manage bookings, and pay through one simple app.</p>
            <div className="download-stats">
              <div className="download-stat"><strong>10 Million+</strong><span>Downloads</span></div>
              <div className="download-stat"><strong>50 Million+</strong><span>Parking Searches</span></div>
              <div className="download-stat"><strong>1 Million+</strong><span>Bookings Resolved</span></div>
            </div>
            <div className="store-row">
              <span className="store-pill"><span className="store-mark" /><span><small>Get it on</small>Google Play</span></span>
              <span className="store-pill"><span className="store-apple" /><span><small>Download on the</small>App Store</span></span>
            </div>
          </div>
          <div className="phone-stack" aria-hidden="true">
            <span className="phone-card">
              <span className="phone-screen simple-phone-screen">
                <span className="phone-status">12:36</span>
                <span className="phone-menu-top"><span>Menu</span><span>...</span></span>
                <span className="phone-search">Search for services...</span>
                <span className="phone-section-title">ParkIQ exclusive</span>
                <span className="phone-grid">
                  {["Cars", "UPI", "Parking", "EMI", "Reward", "Used", "Brand", "Report"].map((item) => (
                    <span className="phone-app" key={item}><span className="phone-app-icon">P</span>{item}</span>
                  ))}
                </span>
                <span className="phone-section-title">Search for parking info</span>
                <span className="phone-info-cards">
                  <span className="phone-info-card" style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>Manage<br />parking</span>
                  <span className="phone-info-card" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>Search any<br />vehicle info</span>
                </span>
              </span>
            </span>
            <span className="phone-card phone-card-alt">
              <span className="phone-screen simple-phone-screen">
                <span className="phone-status">12:39</span>
                <span className="simple-phone-header"><span>&lt;</span><span>ParkIQ</span><span>*</span></span>
                <span className="simple-phone-title">SRM University AP Campus</span>
                <span className="simple-phone-art" />
                <span className="simple-parking-card">
                  <strong>SRM AP Parking</strong>
                  <span>Neerukonda campus lot</span>
                  <span>0.3 km away - 19 slots free</span>
                  <span className="simple-phone-actions">
                    <span className="phone-price">Rs. 40/hour</span>
                    <span className="phone-book">Book now</span>
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="copyright">Copyright 2026 ParkIQ. All rights reserved. Privacy Policy | Terms | Site Map</div>
    </footer>
  );
}

