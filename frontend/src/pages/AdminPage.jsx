import { useEffect, useState } from "react";
import { Stat } from "../components/Stats.jsx";
import { BookingsList } from "./BookingsList.jsx";

export function AdminPage({ user, go, authLoading, locations, slots, bookings, users, addLocation, editLocation, deleteLocation, editUser, deleteUser, notify, cancelBooking }) {
  const [tab, setTab] = useState("overview");
  const [form, setForm] = useState({ name: "", address: "", totalSlots: "" });
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [locationForm, setLocationForm] = useState({ name: "", address: "", totalSlots: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      go("home");
    }
  }, [authLoading, go, user]);

  if (authLoading) {
    return (
      <div className="page fade admin-page">
        <p className="eyebrow">Admin</p>
        <h1 className="display" style={{ fontSize: "2rem" }}>Loading admin workspace...</h1>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleAdd = async () => {
    if (!form.name || !form.address || !form.totalSlots) return notify("Fill all fields", "err");
    if (isNaN(form.totalSlots) || parseInt(form.totalSlots, 10) < 1) return notify("Enter a valid slot count", "err");
    const ok = await addLocation(form.name, form.address, form.totalSlots);
    if (ok) setForm({ name: "", address: "", totalSlots: "" });
  };

  const startLocationEdit = (loc) => {
    setEditingLocationId(loc.id);
    setLocationForm({
      name: loc.name,
      address: loc.address,
      totalSlots: String(loc.totalSlots),
    });
  };

  const cancelLocationEdit = () => {
    setEditingLocationId(null);
    setLocationForm({ name: "", address: "", totalSlots: "" });
  };

  const saveLocationEdit = async () => {
    if (!locationForm.name || !locationForm.address || !locationForm.totalSlots) return notify("Fill all location fields", "err");
    const ok = await editLocation(editingLocationId, locationForm);
    if (ok) cancelLocationEdit();
  };

  const removeLocationRecord = async (loc) => {
    if (!window.confirm(`Remove ${loc.name}? Existing bookings will remain in history.`)) return;
    const ok = await deleteLocation(loc.id);
    if (ok && editingLocationId === loc.id) cancelLocationEdit();
  };

  const startUserEdit = (selectedUser) => {
    setEditingUserId(selectedUser.id);
    setUserForm({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
    });
  };

  const cancelUserEdit = () => {
    setEditingUserId(null);
    setUserForm({ name: "", email: "", role: "user" });
  };

  const saveUserEdit = async () => {
    if (!userForm.name || !userForm.email) return notify("Fill all user fields", "err");
    const ok = await editUser(editingUserId, userForm);
    if (ok) cancelUserEdit();
  };

  const removeUserAccount = async (selectedUser) => {
    if (!window.confirm(`Delete ${selectedUser.name}? Their bookings will also be removed.`)) return;
    const ok = await deleteUser(selectedUser.id);
    if (ok && editingUserId === selectedUser.id) cancelUserEdit();
  };

  const stats = [
    ["Locations", locations.length],
    ["Total slots", slots.length],
    ["Available", slots.filter((s) => s.status === "available").length],
    ["Bookings", bookings.length],
    ["Active", bookings.filter((b) => b.status === "confirmed").length],
    ["Users", users.filter((u) => u.role === "user").length],
  ];

  const sections = [
    { key: "overview", title: "Overview", subtitle: "System snapshot and quick totals" },
    { key: "locations", title: "Locations", subtitle: "Manage parking areas and slot capacity" },
    { key: "bookings", title: "Bookings", subtitle: "Review and control all reservations" },
    { key: "users", title: "Users", subtitle: "Edit roles and manage account access" },
  ];

  const activeSection = sections.find((section) => section.key === tab) || sections[0];

  return (
    <div className="page fade admin-page">
      <p className="eyebrow">Admin</p>
      <h1 className="display" style={{ fontSize: "2rem" }}>Management console</h1>
      <p className="muted" style={{ marginTop: ".45rem" }}>Admin-only workspace for locations, bookings, users, and slot capacity.</p>

      <div className="admin-shell">
        <aside className="card admin-sidebar">
          <div className="admin-sidebar-head">
            <span className="eyebrow">Explorer</span>
            <strong>Admin workspace</strong>
          </div>
          <div className="admin-sidebar-list" role="tablist" aria-label="Admin sections">
            {sections.map((section, index) => (
              <button
                key={section.key}
                className={`admin-nav-item ${tab === section.key ? "admin-nav-item-a" : ""}`}
                onClick={() => setTab(section.key)}
                role="tab"
                aria-selected={tab === section.key}
                type="button"
              >
                <span className="admin-nav-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="admin-nav-copy">
                  <strong>{section.title}</strong>
                  <small>{section.subtitle}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="admin-main">
          <div className="card admin-panel-head">
            <div>
              <p className="eyebrow">Current panel</p>
              <h2 className="display" style={{ fontSize: "1.5rem", marginTop: ".2rem" }}>{activeSection.title}</h2>
              <p className="muted" style={{ marginTop: ".35rem" }}>{activeSection.subtitle}</p>
            </div>
            <div className="admin-panel-meta">
              <span className="badge-soft">{locations.length} locations</span>
              <span className="badge-soft">{bookings.length} bookings</span>
              <span className="badge-soft">{users.length} accounts</span>
            </div>
          </div>

          {tab === "overview" && (
            <div className="admin-content">
              <div className="card admin-summary-card">
                <p className="eyebrow">Workspace summary</p>
                <h3 className="display" style={{ fontSize: "1.35rem", marginTop: ".25rem" }}>Everything stays organized in one place</h3>
                <p className="muted" style={{ marginTop: ".45rem", lineHeight: 1.55 }}>Use the left explorer to switch between overview, location management, bookings, and user access just like a proper admin workspace.</p>
              </div>
              <div className="grid-stat">
                {stats.map(([label, value]) => <Stat key={label} label={label} value={value} tone={label === "Available" ? "green" : undefined} />)}
              </div>
            </div>
          )}

          {tab === "locations" && (
            <div className="admin-content">
              <div className="card" style={{ padding: "1.2rem" }}>
                <h3 style={{ marginBottom: 12 }}>Add location</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                  <input className="inp" placeholder="Location name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                  <input className="inp" placeholder="Address" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
                  <input className="inp" type="number" placeholder="Slots" value={form.totalSlots} onChange={(e) => setForm((p) => ({ ...p, totalSlots: e.target.value }))} />
                  <button className="btn-p" onClick={handleAdd}>Add location</button>
                </div>
              </div>

              {locations.map((loc) => {
                const avail = slots.filter((s) => s.locationId === loc.id && s.status === "available").length;
                const isEditing = editingLocationId === loc.id;

                return (
                  <div key={loc.id} className="card" style={{ padding: "1rem", display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                      <div>
                        <strong>{loc.name}</strong>
                        <p className="muted">{loc.address}</p>
                      </div>
                      <div className="admin-action-row">
                        <span className="badge-ok admin-pill">{avail}/{loc.totalSlots} free</span>
                        <button className="btn-s admin-pill admin-pill-btn" onClick={() => (isEditing ? cancelLocationEdit() : startLocationEdit(loc))}>{isEditing ? "Cancel" : "Edit"}</button>
                        <button className="btn-d admin-pill admin-pill-btn" onClick={() => removeLocationRecord(loc)}>Delete</button>
                      </div>
                    </div>

                    {isEditing && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                        <input className="inp" placeholder="Location name" value={locationForm.name} onChange={(e) => setLocationForm((p) => ({ ...p, name: e.target.value }))} />
                        <input className="inp" placeholder="Address" value={locationForm.address} onChange={(e) => setLocationForm((p) => ({ ...p, address: e.target.value }))} />
                        <input className="inp" type="number" placeholder="Slots" value={locationForm.totalSlots} onChange={(e) => setLocationForm((p) => ({ ...p, totalSlots: e.target.value }))} />
                        <button className="btn-p" onClick={saveLocationEdit}>Save changes</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "bookings" && (
            <div className="admin-content">
              <BookingsList title="All bookings" subtitle={`${bookings.length} total reservations`} bookings={[...bookings].reverse()} empty="No bookings yet." cancelBooking={cancelBooking} go={go} />
            </div>
          )}

          {tab === "users" && (
            <div className="admin-content">
              {users.map((u) => {
                const isEditing = editingUserId === u.id;
                const isCurrentAdmin = user.id === u.id;

                return (
                  <div key={u.id} className="card" style={{ padding: "1rem", display: "grid", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
                      <div>
                        <strong>{u.name}</strong>
                        <p className="muted">{u.email}</p>
                      </div>
                      <div className="admin-action-row">
                        <span className="badge-soft admin-pill">{u.role}</span>
                        <button className="btn-s admin-pill admin-pill-btn" onClick={() => (isEditing ? cancelUserEdit() : startUserEdit(u))}>{isEditing ? "Cancel" : "Edit"}</button>
                        <button className="btn-d admin-pill admin-pill-btn" onClick={() => removeUserAccount(u)} disabled={isCurrentAdmin} style={isCurrentAdmin ? { opacity: .6, cursor: "not-allowed" } : undefined}>Delete</button>
                      </div>
                    </div>

                    {isEditing && (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                        <input className="inp" placeholder="Full name" value={userForm.name} onChange={(e) => setUserForm((p) => ({ ...p, name: e.target.value }))} />
                        <input className="inp" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))} />
                        <select className="inp" value={userForm.role} onChange={(e) => setUserForm((p) => ({ ...p, role: e.target.value }))}>
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                        <button className="btn-p" onClick={saveUserEdit}>Save changes</button>
                      </div>
                    )}

                    {isCurrentAdmin && <p className="muted" style={{ fontSize: ".86rem" }}>Your own admin account cannot be deleted from the admin console.</p>}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
