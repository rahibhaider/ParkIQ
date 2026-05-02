import { useEffect, useState } from "react";

export function LocationPage({ selLoc, slots, go, user, setSelSlot, notify }) {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!selLoc) return;
    window.setTimeout(() => window.scrollTo({ top: 0, left: 0 }), 0);
  }, [selLoc]);

  if (!selLoc) {
    go("home");
    return null;
  }

  const locSlots = slots.filter((s) => s.locationId === selLoc.id);
  const avail = locSlots.filter((s) => s.status === "available").length;
  const shown = filter === "all" ? locSlots : locSlots.filter((s) => s.status === filter);

  const pick = (slot) => {
    if (slot.status === "booked") return;
    if (!user) {
      notify("Please sign in to book", "info");
      go("auth");
      return;
    }
    setSelSlot(slot);
    go("booking");
  };

  return (
    <div className="narrow-page fade">
      <button className="btn-s" onClick={() => go("home")} style={{ marginBottom: "1rem" }}>Back to locations</button>
      <div className="card" style={{ padding: "1.5rem", marginBottom: "1.2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div><p className="eyebrow">{selLoc.type || "Parking"}</p><h1 className="display" style={{ fontSize: "2rem" }}>{selLoc.name}</h1><p className="muted">{selLoc.address}</p></div>
          <div style={{ textAlign: "right" }}><div className="display" style={{ fontSize: "2.6rem", color: avail ? "var(--success-text)" : "var(--danger-text)" }}>{avail}</div><p className="muted">of {selLoc.totalSlots} free</p></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem" }}>
        {[{ key: "all", label: `All (${locSlots.length})` }, { key: "available", label: `Available (${avail})` }, { key: "booked", label: `Booked (${locSlots.length - avail})` }].map((f) => <button key={f.key} className={filter === f.key ? "btn-p" : "btn-s"} onClick={() => setFilter(f.key)}>{f.label}</button>)}
      </div>
      <p className="muted" style={{ marginBottom: "1rem" }}>Select an available slot to continue to ParkIQ UPI payment.</p>
      <div className="grid-slots">{shown.map((slot) => <div key={slot.id} className={slot.status === "available" ? "slot-av" : "slot-bk"} onClick={() => pick(slot)}><div className="mono" style={{ fontSize: "1rem" }}>{slot.slotNumber}</div><div style={{ fontSize: ".68rem", textTransform: "uppercase", marginTop: 3 }}>{slot.status === "available" ? "Free" : "Taken"}</div></div>)}</div>
    </div>
  );
}
