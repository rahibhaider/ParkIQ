import { useState } from "react";

export function AuthPage({ login, signup, authMode, setAuthMode }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    if (authMode === "login") {
      if (!(await login(email, pw))) setErr("Invalid credentials or API unavailable.");
      return;
    }
    if (!name || !email || !pw) return setErr("All fields are required.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");
    if (!(await signup(name, email, pw))) setErr("Could not create account. Check the email and try again.");
  };

  return (
    <div className="narrow-page fade" style={{ display: "grid", placeItems: "center", minHeight: "calc(100vh - 72px)" }}>
      <div className="card" style={{ width: "100%", maxWidth: 430, padding: "2rem" }}>
        <p className="eyebrow">Account access</p>
        <h1 className="display" style={{ fontSize: "2rem", marginBottom: ".5rem" }}>{authMode === "login" ? "Welcome back" : "Create account"}</h1>
        <p className="muted" style={{ marginBottom: "1.4rem" }}>Sign in or create an account saved in MongoDB.</p>
        <div style={{ display: "grid", gap: 12 }}>
          {authMode === "signup" && <input className="inp" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />}
          <input className="inp" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="inp" type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
          {err && <p style={{ color: "var(--danger-text)", fontWeight: 800, fontSize: ".86rem" }}>{err}</p>}
          <button className="btn-p" onClick={submit}>{authMode === "login" ? "Sign in" : "Create account"}</button>
          <button className="btn-s" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>{authMode === "login" ? "Create a new account" : "Already have an account"}</button>
        </div>
      </div>
    </div>
  );
}
