import { PARKIQ_MERCHANT_UPI_ID } from "../utils/booking.js";
import { normalizeSearch, sortLocationsForSearch } from "../utils/search.js";
import { Row, Stat } from "../components/Stats.jsx";

const DEFAULT_VISIBLE_LOCATION_COUNT = 10;

export function HomePage({ go, locations, slots, dataLoading, dataError, retryData, setSelLoc, searchQuery, setSearchQuery }) {
  const totalAvail = slots.filter((s) => s.status === "available").length;
  const availCount = (locId) => slots.filter((s) => s.locationId === locId && s.status === "available").length;
  const cleanQuery = normalizeSearch(searchQuery);
  const filteredLocations = cleanQuery ? sortLocationsForSearch(locations, cleanQuery) : locations;
  const visibleLocations = cleanQuery ? filteredLocations : filteredLocations.slice(0, DEFAULT_VISIBLE_LOCATION_COUNT);

  return (
    <div id="home-top" className="page fade">
      <section className="shell" style={{ borderRadius: 18, padding: "clamp(.9rem, 2vw, 1.4rem)", marginBottom: ".75rem", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(250px, .65fr)", gap: "1rem", alignItems: "center" }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: ".45rem" }}>Parking, without the guesswork</p>
          <h1 className="display section-title">Reserve a reliable parking space before you arrive.</h1>
          <p className="muted" style={{ maxWidth: 620, lineHeight: 1.45, marginTop: ".6rem" }}>Book city parking slots with live availability, simple reservations, and ParkIQ UPI checkout.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: ".8rem" }}>
            <button className="btn-p" onClick={() => document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" })}>Find parking</button>
            <button className="btn-s" onClick={() => go("auth")}>Sign in</button>
          </div>
        </div>
        <div className="card" style={{ padding: ".85rem" }}>
          <p className="eyebrow">Today</p>
          <div className="display" style={{ fontSize: "2.35rem", lineHeight: 1, marginTop: 4 }}>{totalAvail}</div>
          <p className="muted" style={{ marginBottom: ".75rem" }}>
            {dataLoading ? "Loading live slot data..." : dataError ? "Waiting for the backend..." : `open slots across ${locations.length} locations`}
          </p>
          <div className="divider" />
          <div style={{ display: "grid", gap: 6, marginTop: ".65rem" }}>
            <Row label="ParkIQ UPI" value={PARKIQ_MERCHANT_UPI_ID} />
            <Row label="Booking ID" value="Generated instantly" />
            <Row label="Admin view" value="Included" />
          </div>
        </div>
      </section>

      <div className="grid-stat" style={{ marginBottom: ".65rem" }}>
        <Stat label="Locations" value={locations.length} />
        <Stat label="Total slots" value={slots.length} />
        <Stat label="Available now" value={totalAvail} tone="green" />
      </div>

      <section className="animated-cards" aria-label="ParkIQ quick features">
        <div className="motion-track">
          {[
            ["Fast booking", "Pick a live slot and get your booking ID instantly."],
            ["ParkIQ UPI", `Pay through ${PARKIQ_MERCHANT_UPI_ID} at checkout.`],
            ["Live availability", "Compare open slots before choosing your parking area."],
            ["Smart search", "Search hidden parking areas by name, type, or address."],
            ["Admin tools", "Manage locations, bookings, and users from the admin console."],
          ].map(([title, text]) => (
            <article key={title} className="motion-card">
              <span className="motion-icon">P</span>
              <span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </span>
            </article>
          ))}
        </div>
      </section>

      <section id="locations">
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 16, marginBottom: ".5rem" }}>
          <div>
            <p className="eyebrow">Locations</p>
            <h2 className="display" style={{ fontSize: "1.45rem" }}>Choose your parking area</h2>
          </div>
        </div>
        {dataLoading && locations.length === 0 ? (
          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontWeight: 800, marginBottom: 6 }}>Loading live parking data...</p>
            <p className="muted">Fetching locations and slot availability from the backend.</p>
          </div>
        ) : dataError && locations.length === 0 ? (
          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontWeight: 800, marginBottom: 6 }}>Could not load live parking data</p>
            <p className="muted" style={{ marginBottom: 12 }}>{dataError}</p>
            <button className="btn-p" onClick={retryData}>Retry</button>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontWeight: 800, marginBottom: 6 }}>No locations found</p>
            <p className="muted" style={{ marginBottom: 12 }}>Try searching by mall, hospital, office, campus, or address.</p>
            <button className="btn-s" onClick={() => setSearchQuery("")}>Clear search</button>
          </div>
        ) : (
          <div className="grid-loc">
            {visibleLocations.map((loc) => {
              const avail = availCount(loc.id);
              const pct = Math.round((avail / loc.totalSlots) * 100);
              const booked = loc.totalSlots - avail;
              return (
                <button key={loc.id} className="card" onClick={() => { setSelLoc(loc); go("location"); }} style={{ textAlign: "left", padding: ".78rem .9rem", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span className="badge-soft">{loc.type || "Parking"}</span>
                    <span className={avail > 0 ? "badge-ok" : "badge-can"}>{avail > 0 ? "Open" : "Full"}</span>
                  </div>
                  <h3 style={{ marginTop: ".7rem", fontSize: "1rem" }}>{loc.name}</h3>
                  <p className="muted" style={{ fontSize: ".88rem", lineHeight: 1.5, marginTop: 4 }}>{loc.address}</p>
                  <div style={{ marginTop: ".7rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".88rem", fontWeight: 800 }}><span>{avail}/{loc.totalSlots} free</span><span>{booked} booked</span></div>
                    <p className="muted" style={{ fontSize: ".77rem", marginTop: 6 }}>{pct}% of slots are currently free</p>
                    <div style={{ height: 8, background: "var(--progress-track)", borderRadius: 999, marginTop: 8, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: avail > 0 ? "var(--green)" : "var(--red)" }} /></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
