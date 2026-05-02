import { useEffect, useState } from "react";
import parkingBackground from "./assets/parking-background.png";
import { Navbar, Toast, Footer } from "./components/Layout.jsx";
import { CSS } from "./styles/appStyles.js";
import { getBookingAmount, getVehicleLabel } from "./utils/booking.js";
import { authAPI, bookingAPI, locationAPI, slotAPI } from "./utils/api.js";
import { AdminPage } from "./pages/AdminPage.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { BookingPage } from "./pages/BookingPage.jsx";
import { ConfirmPage } from "./pages/ConfirmPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LocationPage } from "./pages/LocationPage.jsx";

const PAGE_STORAGE_KEY = "parkiq_page";
const VALID_PAGES = new Set(["home", "auth", "location", "booking", "confirm", "dashboard", "admin"]);

function getInitialPage() {
  const storedPage = localStorage.getItem(PAGE_STORAGE_KEY) || "home";
  return VALID_PAGES.has(storedPage) ? storedPage : "home";
}

export default function App() {
  const [page, setPage] = useState(getInitialPage);
  const [theme, setTheme] = useState(() => localStorage.getItem("parkiq_theme") || "dark");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("parkiq_token") || "");
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem("parkiq_token")));
  const [locations, setLocations] = useState([]);
  const [slots, setSlots] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selLoc, setSelLoc] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [lastBooking, setLastBooking] = useState(null);
  const [toast, setToast] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--parking-bg", `url(${parkingBackground})`);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("parkiq_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(PAGE_STORAGE_KEY, page);
  }, [page]);

  // Toast messages are intentionally short-lived so page actions feel responsive.
  const notify = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const normalizeUser = (u) => ({ ...u, id: u.id || u._id });
  const normalizeLocation = (loc) => ({ ...loc, id: loc.id || loc._id, type: loc.type || "Parking", totalSlots: loc.totalSlots || 0 });
  const normalizeSlot = (slot) => ({ ...slot, id: slot.id || slot._id, locationId: slot.locationId || slot.location?._id || slot.location });

  const normalizeBooking = (booking, fallbackUser = user) => {
    const location = booking.location || {};
    const slot = booking.slot || {};
    const startTime = booking.startTime || "00:00";
    const endTime = booking.endTime || "00:00";
    const vehicleType = booking.vehicleType || "car";
    return {
      ...booking,
      id: booking.id || booking._id,
      userId: booking.user?._id || booking.user?.id || booking.user,
      userName: booking.user?.name || fallbackUser?.name || "User",
      locationId: location._id || location.id || booking.location,
      locationName: location.name || "Parking location",
      slotId: slot._id || slot.id || booking.slot,
      slotNumber: slot.slotNumber || "",
      vehicleType,
      vehicleLabel: getVehicleLabel(vehicleType),
      time: `${startTime} - ${endTime}`,
      payment: booking.payment || { method: "UPI", amount: getBookingAmount(startTime, endTime, vehicleType) },
    };
  };

  const loadLocationsAndSlots = async () => {
    setDataLoading(true);
    setDataError("");
    try {
      const locationRes = await locationAPI.getAll();
      const nextLocations = locationRes.data.map(normalizeLocation);
      setLocations(nextLocations);

      const slotGroups = await Promise.all(
        nextLocations.map((loc) => slotAPI.getByLocation(loc.id).then((res) => res.data.map(normalizeSlot)))
      );
      setSlots(slotGroups.flat());
    } catch (err) {
      setLocations([]);
      setSlots([]);
      setDataError("Live parking data is unavailable. Start the backend with `npm run api`, then refresh or tap retry.");
      throw err;
    } finally {
      setDataLoading(false);
    }
  };

  const loadBookings = async (activeToken = token, activeUser = user) => {
    if (!activeToken || !activeUser) {
      setBookings([]);
      return;
    }
    const res = activeUser.role === "admin" ? await bookingAPI.getAll(activeToken) : await bookingAPI.getMine(activeToken);
    setBookings(res.data.map((booking) => normalizeBooking(booking, activeUser)));
  };

  const loadUsers = async (activeToken = token, activeUser = user) => {
    if (!activeToken || activeUser?.role !== "admin") {
      setUsers(activeUser ? [activeUser] : []);
      return;
    }
    const res = await authAPI.getUsers(activeToken);
    setUsers(res.data.map(normalizeUser));
  };

  useEffect(() => {
    loadLocationsAndSlots().catch(() => {});
  }, []);

  useEffect(() => {
    if (!dataError) return undefined;
    const retryTimer = window.setTimeout(() => {
      loadLocationsAndSlots().catch(() => {});
    }, 3000);
    return () => window.clearTimeout(retryTimer);
  }, [dataError]);

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }
    setAuthLoading(true);
    authAPI.getMe(token)
      .then((res) => {
        const nextUser = normalizeUser(res.user);
        setUser(nextUser);
        if (page === "admin" && nextUser.role !== "admin") setPage("home");
        return Promise.all([loadBookings(token, nextUser), loadUsers(token, nextUser)]);
      })
      .catch(() => {
        localStorage.removeItem("parkiq_token");
        setToken("");
        setUser(null);
        setPage("home");
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [token]);

  const go = (p) => setPage(p);
  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  const login = async (email, pw) => {
    try {
      const res = await authAPI.login(email, pw);
      const nextUser = normalizeUser(res.user);
      localStorage.setItem("parkiq_token", res.token);
      setToken(res.token);
      setUser(nextUser);
      await Promise.all([loadBookings(res.token, nextUser), loadUsers(res.token, nextUser)]);
      notify(`Welcome, ${nextUser.name}`);
      go(nextUser.role === "admin" ? "admin" : "home");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const signup = async (name, email, pw) => {
    try {
      const res = await authAPI.register(name, email, pw);
      const nextUser = normalizeUser(res.user);
      localStorage.setItem("parkiq_token", res.token);
      setToken(res.token);
      setUser(nextUser);
      setUsers([nextUser]);
      notify(`Welcome, ${nextUser.name}`);
      go("home");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("parkiq_token");
    setToken("");
    setUser(null);
    setBookings([]);
    setUsers([]);
    go("home");
    notify("Logged out", "info");
  };

  const doBook = async (slotId, date, time, vehicleType, payment) => {
    if (!token) {
      notify("Please sign in again before booking", "err");
      go("auth");
      return;
    }
    try {
      const [startTime, endTime] = time.split(" - ");
      const slot = slots.find((s) => s.id === slotId);
      const res = await bookingAPI.create({ slotId, locationId: slot.locationId, date, startTime, endTime, vehicleType }, token);
      const b = normalizeBooking({ ...res.data, vehicleType, payment });
      setBookings((p) => [b, ...p.filter((existing) => existing.id !== b.id)]);
      setSlots((p) => p.map((s) => s.id === slotId ? { ...s, status: "booked" } : s));
      setLastBooking(b);
      await loadLocationsAndSlots();
      notify("Booking confirmed");
      go("confirm");
    } catch (err) {
      notify(err.message, "err");
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const b = bookings.find((x) => x.id === bookingId);
      await bookingAPI.cancel(bookingId, token);
      setBookings((p) => p.map((x) => x.id === bookingId ? { ...x, status: "cancelled" } : x));
      if (b) setSlots((p) => p.map((s) => s.id === b.slotId ? { ...s, status: "available" } : s));
      await loadLocationsAndSlots();
      notify("Booking cancelled", "info");
    } catch (err) {
      notify(err.message, "err");
    }
  };

  const addLocation = async (name, address, totalSlots) => {
    try {
      await locationAPI.create({ name, address, totalSlots: parseInt(totalSlots, 10) }, token);
      await loadLocationsAndSlots();
      notify("Location added");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const editLocation = async (locationId, updates) => {
    try {
      await locationAPI.update(locationId, { ...updates, totalSlots: parseInt(updates.totalSlots, 10) }, token);
      await loadLocationsAndSlots();
      notify("Location updated");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const deleteLocation = async (locationId) => {
    try {
      await locationAPI.remove(locationId, token);
      if (selLoc?.id === locationId) setSelLoc(null);
      await loadLocationsAndSlots();
      notify("Location removed", "info");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const editUser = async (userId, updates) => {
    try {
      const res = await authAPI.updateUser(userId, updates, token);
      const nextUser = normalizeUser(res.data);
      setUsers((prev) => prev.map((existing) => existing.id === userId ? nextUser : existing));
      if (user?.id === userId) setUser(nextUser);
      notify("User updated");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await authAPI.removeUser(userId, token);
      await Promise.all([loadUsers(token, user), loadBookings(token, user), loadLocationsAndSlots()]);
      notify("User deleted", "info");
      return true;
    } catch (err) {
      notify(err.message, "err");
      return false;
    }
  };

  const props = { page, go, user, authLoading, dataLoading, dataError, retryData: () => loadLocationsAndSlots().catch(() => {}), login, signup, logout, locations, slots, bookings, users, selLoc, setSelLoc, selSlot, setSelSlot, lastBooking, doBook, cancelBooking, addLocation, editLocation, deleteLocation, editUser, deleteUser, notify, authMode, setAuthMode, searchQuery, setSearchQuery };
  const isAdminView = page === "admin" && (authLoading || user?.role === "admin");

  return (
    <div data-theme={theme}>
      <style>{CSS}</style>
      <Toast toast={toast} />
      <Navbar user={user} go={go} logout={logout} theme={theme} toggleTheme={toggleTheme} searchQuery={searchQuery} setSearchQuery={setSearchQuery} locations={locations} adminMode={isAdminView} />
      <main>
        {page === "home" && <HomePage {...props} />}
        {page === "auth" && <AuthPage {...props} />}
        {page === "location" && <LocationPage {...props} />}
        {page === "booking" && <BookingPage {...props} />}
        {page === "confirm" && <ConfirmPage {...props} />}
        {page === "dashboard" && <DashboardPage {...props} />}
        {page === "admin" && <AdminPage {...props} />}
      </main>
      {!isAdminView && <Footer go={go} notify={notify} />}
    </div>
  );
}
