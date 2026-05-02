export function Row({ label, value }) {
  return <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}><span className="muted">{label}</span><strong>{value}</strong></div>;
}

export function Stat({ label, value, tone }) {
  return <div className="stat"><div className="display" style={{ fontSize: "1.9rem", lineHeight: 1.05, color: tone === "green" ? "var(--success-text)" : "var(--ink)" }}>{value}</div><div className="muted" style={{ fontWeight: 800, fontSize: ".9rem" }}>{label}</div></div>;
}

