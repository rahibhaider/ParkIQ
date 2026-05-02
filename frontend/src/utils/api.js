const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5050/api";

async function request(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    const detail = data.message || data.errors?.[0]?.msg || "Request failed";
    throw new Error(detail);
  }
  return data;
}

export const authAPI = {
  register: (name, email, password) => request("POST", "/auth/register", { name, email, password }),
  login: (email, password) => request("POST", "/auth/login", { email, password }),
  getMe: (token) => request("GET", "/auth/me", null, token),
  getUsers: (token) => request("GET", "/auth/users", null, token),
  updateUser: (id, data, token) => request("PUT", `/auth/users/${id}`, data, token),
  removeUser: (id, token) => request("DELETE", `/auth/users/${id}`, null, token),
};

export const locationAPI = {
  getAll: () => request("GET", "/locations"),
  create: (data, token) => request("POST", "/locations", data, token),
  update: (id, data, token) => request("PUT", `/locations/${id}`, data, token),
  remove: (id, token) => request("DELETE", `/locations/${id}`, null, token),
};

export const slotAPI = {
  getByLocation: (locationId) => request("GET", `/locations/${locationId}/slots`),
};

export const bookingAPI = {
  create: (data, token) => request("POST", "/bookings", data, token),
  getMine: (token) => request("GET", "/bookings/my", null, token),
  getAll: (token) => request("GET", "/bookings", null, token),
  cancel: (id, token) => request("PUT", `/bookings/${id}/cancel`, null, token),
};
