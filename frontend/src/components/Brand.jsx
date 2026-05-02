export function LogoMark() {
  return (
    <span style={{
      width: 42,
      height: 42,
      borderRadius: 12,
      background: "linear-gradient(135deg, var(--logo-start), var(--logo-end))",
      color: "#ffffff",
      display: "grid",
      placeItems: "center",
      fontWeight: 900,
      letterSpacing: -1,
      boxShadow: "0 10px 20px rgba(15, 118, 110, .24)",
      position: "relative",
      overflow: "hidden",
    }}>
      <span style={{ fontSize: 20, lineHeight: 1 }}>P</span>
      <span style={{ position: "absolute", bottom: 7, width: 18, height: 3, borderRadius: 99, background: "rgba(255,255,255,.85)" }} />
    </span>
  );
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

