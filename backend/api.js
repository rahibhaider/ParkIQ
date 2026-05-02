/**
 * api.js  –  Drop this file into your smart-parking/src/ folder.
 *
 * Replace the in-memory state in App.jsx with these API calls
 * once your backend is running on http://localhost:5000
 */

const BASE = "http://localhost:5000/api";

// ─── Helper ───────────────────────────────────────────────────────────────────
async function request(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (name, email, password) =>
    request("POST", "/auth/register", { name, email, password }),

  login: (email, password) =>
    request("POST", "/auth/login", { email, password }),

  getMe: (token) =>
    request("GET", "/auth/me", null, token),

  getUsers: (token) =>
    request("GET", "/auth/users", null, token),
};

// ─── Locations ────────────────────────────────────────────────────────────────
export const locationAPI = {
  getAll: () =>
    request("GET", "/locations"),

  getOne: (id) =>
    request("GET", `/locations/${id}`),

  create: (data, token) =>
    request("POST", "/locations", data, token),

  update: (id, data, token) =>
    request("PUT", `/locations/${id}`, data, token),

  remove: (id, token) =>
    request("DELETE", `/locations/${id}`, null, token),
};

// ─── Slots ────────────────────────────────────────────────────────────────────
export const slotAPI = {
  getByLocation: (locationId, status) => {
    const qs = status ? `?status=${status}` : "";
    return request("GET", `/locations/${locationId}/slots${qs}`);
  },

  updateStatus: (slotId, status, token) =>
    request("PUT", `/slots/${slotId}`, { status }, token),

  getAll: (token) =>
    request("GET", "/slots/all", null, token),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const bookingAPI = {
  create: ({ slotId, locationId, date, startTime, endTime }, token) =>
    request("POST", "/bookings", { slotId, locationId, date, startTime, endTime }, token),

  getMine: (token) =>
    request("GET", "/bookings/my", null, token),

  getOne: (id, token) =>
    request("GET", `/bookings/${id}`, null, token),

  cancel: (id, token) =>
    request("PUT", `/bookings/${id}/cancel`, null, token),

  getAll: (token, filters = {}) => {
    const qs = new URLSearchParams(filters).toString();
    return request("GET", `/bookings${qs ? "?" + qs : ""}`, null, token);
  },
};
