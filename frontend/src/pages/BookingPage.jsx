import { useMemo, useState } from "react";
import { Row } from "../components/Stats.jsx";
import { getBookingAmount, getVehicleOption, PARKIQ_MERCHANT_UPI_ID, VEHICLE_OPTIONS } from "../utils/booking.js";

export function BookingPage({ selSlot, selLoc, user, doBook, go, notify }) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [t1, setT1] = useState("09:00");
  const [t2, setT2] = useState("11:00");
  const [vehicleType, setVehicleType] = useState("car");
  const [paid, setPaid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const vehicle = getVehicleOption(vehicleType);
  const amount = useMemo(() => {
    return getBookingAmount(t1, t2, vehicleType);
  }, [t1, t2, vehicleType]);

  if (!selSlot || !selLoc) {
    go("home");
    return null;
  }

  const payDemo = () => {
    if (!date || !t1 || !t2) return notify("Fill all booking fields", "err");
    if (t2 <= t1) return notify("End time must be after start", "err");
    setPaid(true);
    notify("UPI payment marked successful");
  };

  const submit = async () => {
    if (!paid) return notify("Complete the UPI payment first", "info");
    setSubmitting(true);
    await doBook(selSlot.id, date, `${t1} - ${t2}`, vehicleType, { method: "UPI", merchantUpiId: PARKIQ_MERCHANT_UPI_ID, amount });
    setSubmitting(false);
  };

  return (
    <div className="narrow-page fade" style={{ display: "grid", placeItems: "start center" }}>
      <div className="card" style={{ width: "100%", maxWidth: 560, padding: "2rem" }}>
        <button className="btn-s" onClick={() => go("location")} style={{ marginBottom: "1rem" }}>Back to slots</button>
        <p className="eyebrow">Checkout</p>
        <h1 className="display" style={{ fontSize: "2rem" }}>Confirm reservation</h1>
        <p className="muted" style={{ marginBottom: "1.4rem" }}>Pay the parking amount to the ParkIQ merchant UPI ID and choose the vehicle you are bringing.</p>
        <div className="stat" style={{ marginBottom: "1rem" }}><Row label="Location" value={selLoc.name} /><Row label="Slot" value={selSlot.slotNumber} /><Row label="Booked by" value={user.name} /></div>
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            <span className="muted" style={{ display: "block", marginBottom: 5, fontWeight: 800 }}>Vehicle type</span>
            <select className="inp" value={vehicleType} onChange={(e) => { setVehicleType(e.target.value); setPaid(false); }}>
              {VEHICLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label} - Rs. {option.hourlyRate}/hr</option>
              ))}
            </select>
          </label>
          <label><span className="muted" style={{ display: "block", marginBottom: 5, fontWeight: 800 }}>Parking date</span><input className="inp" type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label><span className="muted" style={{ display: "block", marginBottom: 5, fontWeight: 800 }}>Arrival</span><input className="inp" type="time" value={t1} onChange={(e) => { setT1(e.target.value); setPaid(false); }} /></label>
            <label><span className="muted" style={{ display: "block", marginBottom: 5, fontWeight: 800 }}>Departure</span><input className="inp" type="time" value={t2} onChange={(e) => { setT2(e.target.value); setPaid(false); }} /></label>
          </div>
          <div className="card" style={{ padding: "1.2rem", background: "var(--paper)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
              <div>
                <p className="eyebrow">ParkIQ UPI payment</p>
                <p className="muted">Merchant UPI ID: <strong>{PARKIQ_MERCHANT_UPI_ID}</strong></p>
                <p className="muted" style={{ marginTop: 4 }}>{vehicle.label} rate: Rs. {vehicle.hourlyRate}/hour</p>
              </div>
              <strong style={{ fontSize: "1.4rem" }}>Rs. {amount}</strong>
            </div>
            <button className={paid ? "btn-s" : "btn-p"} style={{ width: "100%", marginTop: 12 }} onClick={payDemo}>{paid ? "Payment successful" : "Pay to ParkIQ UPI"}</button>
          </div>
          <button className="btn-p" onClick={submit} disabled={submitting} style={{ width: "100%" }}>{submitting ? "Saving booking..." : "Confirm booking"}</button>
        </div>
      </div>
    </div>
  );
}
