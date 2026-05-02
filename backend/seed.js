/**
 * Populate the database with ParkIQ starter data.
 *
 * Usage:
 *   node seed.js          seed users, locations, and available slots
 *   node seed.js --clear  wipe all collections
 */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const User = require("./models/User");
const Location = require("./models/Location");
const Slot = require("./models/Slot");
const Booking = require("./models/Booking");

const LOCATIONS = [
  { name: "Central Mall", address: "42 Central Ave, Downtown", totalSlots: 20, icon: "P" },
  { name: "City Hospital", address: "15 Medical Dr, Sector 3", totalSlots: 15, icon: "P" },
  { name: "Tech Park Complex", address: "88 Innovation Blvd, TechCity", totalSlots: 24, icon: "P" },
  { name: "SRM University AP Campus", address: "Neerukonda, Amaravati, Andhra Pradesh", totalSlots: 32, icon: "P" },
  { name: "Vijayawada Railway Station", address: "Railway Station Rd, Vijayawada", totalSlots: 28, icon: "P" },
  { name: "PVP Square Mall", address: "MG Road, Vijayawada", totalSlots: 22, icon: "P" },
  { name: "Amaravati Secretariat", address: "Velagapudi, Amaravati", totalSlots: 30, icon: "P" },
  { name: "Guntur Medical Center", address: "Kothapeta, Guntur", totalSlots: 18, icon: "P" },
  { name: "Benz Circle", address: "Benz Circle, Vijayawada", totalSlots: 26, icon: "P" },
  { name: "Kanaka Durga Temple", address: "Indrakeeladri, Vijayawada", totalSlots: 34, icon: "P" },
  { name: "Undavalli Caves", address: "Undavalli, Amaravati", totalSlots: 16, icon: "P" },
  { name: "Mangalagiri Market", address: "Main Bazaar, Mangalagiri", totalSlots: 20, icon: "P" },
  { name: "Guntur Railway Station", address: "Railpet, Guntur", totalSlots: 24, icon: "P" },
  { name: "KL University Campus", address: "Vaddeswaram, Guntur District", totalSlots: 30, icon: "P" },
  { name: "NRI General Hospital", address: "Chinakakani, Mangalagiri", totalSlots: 22, icon: "P" },
  { name: "AP High Court", address: "Nelapadu, Amaravati", totalSlots: 18, icon: "P" },
  { name: "Tadepalli Riverside", address: "Krishna Riverfront, Tadepalli", totalSlots: 14, icon: "P" },
  { name: "VIT-AP University", address: "Inavolu, Amaravati", totalSlots: 28, icon: "P" },
];

const USERS = [
  { name: "Admin", email: "admin@park.io", password: "admin123", role: "admin" },
  { name: "Rahib Haider", email: "rahibhaider814@gmail.com", password: "haider123", role: "user" },
];

function makeSlots(locationId, totalSlots) {
  const slots = [];
  for (let i = 0; i < totalSlots; i += 1) {
    const row = String.fromCharCode(65 + Math.floor(i / 6));
    const col = (i % 6) + 1;
    slots.push({ location: locationId, slotNumber: `${row}${col}`, status: "available" });
  }
  return slots;
}

async function seed() {
  await connectDB();

  const clear = process.argv.includes("--clear");

  console.log("\nClearing existing data...");
  await Booking.deleteMany();
  await Slot.deleteMany();
  await Location.deleteMany();
  await User.deleteMany();

  if (clear) {
    console.log("All collections cleared.\n");
    process.exit(0);
  }

  console.log("Seeding users...");
  for (const userData of USERS) {
    const user = await User.create(userData);
    console.log(` - ${user.name} (${user.email}) [${user.role}]`);
  }

  console.log("\nSeeding locations and available slots...");
  for (const locData of LOCATIONS) {
    const location = await Location.create(locData);
    await Slot.insertMany(makeSlots(location._id, location.totalSlots));
    console.log(` - ${location.name} (${location.totalSlots} slots)`);
  }

  console.log("\nSample bookings skipped. Bookings will appear only after a real user creates one.");
  console.log("\nDatabase seeded successfully!\n");
  console.log("Login credentials:");
  console.log("Admin: admin@park.io / admin123");
  console.log("User : rahibhaider814@gmail.com / haider123");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
