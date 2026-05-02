import { Row } from "../components/Stats.jsx";
import { PARKIQ_MERCHANT_UPI_ID } from "../utils/booking.js";

export function ConfirmPage({ lastBooking, go }) {
  if (!lastBooking) {
    go("home");
    return null;
  }

  return (
    <div className="narrow-page fade" style={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 72px)" }}>
      <div className="card" style={{ width: "100%", maxWidth: 500, padding: "2rem", textAlign: "center" }}>
        <p className="eyebrow">Reservation complete</p>
        <h1 className="display" style={{ fontSize: "2rem" }}>Booking confirmed</h1>
        <p className="muted" style={{ marginBottom: "1.5rem" }}>Show this booking ID at the entrance.</p>
        <div style={{ background: "var(--brand-soft)", borderRadius: 22, padding: "1.2rem", marginBottom: "1rem" }}><p className="eyebrow">Booking ID</p><p className="mono" style={{ fontSize: "2rem", marginTop: 6 }}>{lastBooking.bookingId}</p></div>
        <div className="stat" style={{ textAlign: "left", display: "grid", gap: 8, marginBottom: "1.2rem" }}>
          <Row label="Location" value={lastBooking.locationName} /><Row label="Slot" value={lastBooking.slotNumber} /><Row label="Vehicle" value={lastBooking.vehicleLabel || "Car"} /><Row label="Date" value={lastBooking.date} /><Row label="Time" value={lastBooking.time} /><Row label="Merchant UPI" value={lastBooking.payment?.merchantUpiId || PARKIQ_MERCHANT_UPI_ID} /><Row label="Payment" value={`${lastBooking.payment?.method || "UPI"}, Rs. ${lastBooking.payment?.amount || 0}`} />
        </div>
        <div style={{ display: "flex", gap: 10 }}><button className="btn-s" style={{ flex: 1 }} onClick={() => go("home")}>Book another</button><button className="btn-p" style={{ flex: 1 }} onClick={() => go("dashboard")}>View bookings</button></div>
      </div>
    </div>
  );
}
