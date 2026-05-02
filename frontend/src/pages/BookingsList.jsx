export function BookingsList({ title, subtitle, bookings, empty, cancelBooking, go }) {
  return (
    <div className="narrow-page fade">
      <p className="eyebrow">Reservations</p><h1 className="display" style={{ fontSize: "2rem" }}>{title}</h1><p className="muted" style={{ marginBottom: "1.4rem" }}>{subtitle}</p>
      {bookings.length === 0 ? <div className="card" style={{ padding: "2rem", textAlign: "center" }}><p className="muted" style={{ marginBottom: 12 }}>{empty}</p><button className="btn-p" onClick={() => go("home")}>Browse locations</button></div> : <div style={{ display: "grid", gap: 12 }}>{bookings.map((b) => <div key={b.id} className="card" style={{ padding: "1rem", opacity: b.status === "cancelled" ? .62 : 1 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}><div><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}><span className="mono" style={{ color: "var(--brand-dark)" }}>{b.bookingId}</span><span className={b.status === "confirmed" ? "badge-ok" : "badge-can"}>{b.status}</span><span className="badge-soft">{b.vehicleLabel || "Car"}</span></div><strong>{b.locationName} - Slot {b.slotNumber}</strong><p className="muted" style={{ fontSize: ".9rem" }}>{b.userName} - {b.date} - {b.time} - Rs. {b.payment?.amount || 0}</p></div>{b.status === "confirmed" && <button className="btn-d" onClick={() => cancelBooking(b.id)}>Cancel</button>}</div></div>)}</div>}
    </div>
  );
}
