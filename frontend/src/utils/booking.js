// Booking helpers shared by checkout, confirmation, and dashboard views.
export const PARKIQ_MERCHANT_UPI_ID = "parkiq@upi";

export const VEHICLE_OPTIONS = [
  { value: "bike", label: "Bike", hourlyRate: 20 },
  { value: "car", label: "Car", hourlyRate: 40 },
  { value: "suv", label: "SUV", hourlyRate: 55 },
  { value: "ev", label: "EV", hourlyRate: 45 },
];

export function getVehicleOption(vehicleType = "car") {
  return VEHICLE_OPTIONS.find((option) => option.value === vehicleType) || VEHICLE_OPTIONS[1];
}

export function getVehicleLabel(vehicleType = "car") {
  return getVehicleOption(vehicleType).label;
}

export function getBookingHours(startTime, endTime) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  return Math.max(1, (eh * 60 + em - sh * 60 - sm) / 60);
}

export function getBookingAmount(startTime, endTime, vehicleType = "car") {
  const { hourlyRate } = getVehicleOption(vehicleType);
  return Math.round(getBookingHours(startTime, endTime) * hourlyRate);
}

