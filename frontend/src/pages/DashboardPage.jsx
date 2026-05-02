import { BookingsList } from "./BookingsList.jsx";

export function DashboardPage({ user, authLoading, bookings, cancelBooking, go }) {
  if (authLoading) {
    return null;
  }
  if (!user) {
    go("auth");
    return null;
  }
  const mine = [...bookings.filter((b) => b.userId === user.id)].reverse();
  return <BookingsList title="My bookings" subtitle="Manage your parking reservations" bookings={mine} empty="No bookings yet." cancelBooking={cancelBooking} go={go} />;
}
