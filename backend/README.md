# ParkIQ – Backend API

Node.js + Express + MongoDB REST API for the Smart Parking Slot Booking System.

---

## 🚀 Quick Start

### 1 — Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **OR** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 2 — Install dependencies
```bash
cd smart-parking-backend
npm install
```

### 3 — Configure environment
```bash
# Copy the example file
cp .env.example .env
```

Open `.env` and set your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartparking   # local MongoDB
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/smartparking  # Atlas
JWT_SECRET=any_long_random_string_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4 — Seed demo data (optional but recommended)
```bash
node seed.js
```

### 5 — Start the server
```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

Server runs at → **http://localhost:5000**

---

## 🔑 Demo Credentials (after seeding)

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@park.io     | admin123 |
| User  | rahul@mail.com    | pass123  |
| User  | priya@mail.com    | pass123  |

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication
Protected routes require a Bearer token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Auth Routes

| Method | Endpoint            | Auth     | Description           |
|--------|---------------------|----------|-----------------------|
| POST   | `/auth/register`    | Public   | Create a new account  |
| POST   | `/auth/login`       | Public   | Login, receive token  |
| GET    | `/auth/me`          | User     | Get current user      |
| GET    | `/auth/users`       | Admin    | List all users        |

#### POST `/auth/register`
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@mail.com",
  "password": "pass123"
}
```

#### POST `/auth/login`
```json
{
  "email": "rahul@mail.com",
  "password": "pass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "66f...",
    "name": "Rahul Sharma",
    "email": "rahul@mail.com",
    "role": "user"
  }
}
```

---

### 📍 Location Routes

| Method | Endpoint           | Auth   | Description             |
|--------|--------------------|--------|-------------------------|
| GET    | `/locations`       | Public | Get all locations       |
| GET    | `/locations/:id`   | Public | Get single location     |
| POST   | `/locations`       | Admin  | Create location + slots |
| PUT    | `/locations/:id`   | Admin  | Update location         |
| DELETE | `/locations/:id`   | Admin  | Soft-delete location    |

#### POST `/locations` (Admin)
```json
{
  "name": "Sunrise Mall",
  "address": "77 Ring Road, City Centre",
  "totalSlots": 30,
  "icon": "🏬"
}
```

**Response includes available slot count:**
```json
{
  "success": true,
  "data": {
    "_id": "66f...",
    "name": "Sunrise Mall",
    "address": "77 Ring Road, City Centre",
    "totalSlots": 30,
    "availableSlots": 30,
    "icon": "🏬"
  }
}
```

---

### 🅿️ Slot Routes

| Method | Endpoint                          | Auth   | Description               |
|--------|-----------------------------------|--------|---------------------------|
| GET    | `/locations/:locationId/slots`    | Public | Get slots for a location  |
| GET    | `/locations/:locationId/slots?status=available` | Public | Filter by status |
| GET    | `/slots/all`                      | Admin  | Get all slots             |
| GET    | `/slots/:id`                      | Public | Get single slot           |
| PUT    | `/slots/:id`                      | Admin  | Toggle slot status        |

---

### 📋 Booking Routes

| Method | Endpoint               | Auth  | Description              |
|--------|------------------------|-------|--------------------------|
| POST   | `/bookings`            | User  | Create a booking         |
| GET    | `/bookings/my`         | User  | Get my bookings          |
| GET    | `/bookings/:id`        | User  | Get one booking          |
| PUT    | `/bookings/:id/cancel` | User  | Cancel a booking         |
| GET    | `/bookings`            | Admin | Get all bookings         |

#### POST `/bookings`
```json
{
  "slotId": "66f...",
  "locationId": "66f...",
  "date": "2026-05-10",
  "startTime": "09:00",
  "endTime": "11:00"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "66f...",
    "bookingId": "BKXYZ123",
    "user": { "name": "Rahul Sharma", "email": "rahul@mail.com" },
    "location": { "name": "Central Mall", "icon": "🏬" },
    "slot": { "slotNumber": "A1" },
    "date": "2026-05-10",
    "startTime": "09:00",
    "endTime": "11:00",
    "status": "confirmed"
  }
}
```

---

### ❤️ Health Check

| Method | Endpoint      | Description      |
|--------|---------------|------------------|
| GET    | `/health`     | API health check |

---

## 🗂 Project Structure

```
smart-parking-backend/
├── server.js               ← Express app entry point
├── seed.js                 ← Demo data seeder
├── .env                    ← Your local environment variables
├── .env.example            ← Template for .env
├── api.js                  ← Copy this into frontend/src/ to connect
│
├── config/
│   └── db.js               ← MongoDB connection
│
├── models/
│   ├── User.js             ← Users collection
│   ├── Location.js         ← Locations collection
│   ├── Slot.js             ← Slots collection
│   └── Booking.js          ← Bookings collection
│
├── controllers/
│   ├── authController.js
│   ├── locationController.js
│   ├── slotController.js
│   └── bookingController.js
│
├── routes/
│   ├── auth.js
│   ├── locations.js
│   ├── slots.js
│   └── bookings.js
│
└── middleware/
    ├── auth.js             ← JWT protect + adminOnly
    └── errorHandler.js     ← Central error handler
```

---

## 🛠 Tech Stack

| Layer       | Technology                      |
|-------------|---------------------------------|
| Runtime     | Node.js 18+                     |
| Framework   | Express.js 4                    |
| Database    | MongoDB + Mongoose              |
| Auth        | JWT (jsonwebtoken)              |
| Passwords   | bcryptjs                        |
| Validation  | express-validator               |
| Dev tool    | nodemon                         |

---

## 🔗 Connecting to the Frontend

1. Copy `api.js` from this folder into `smart-parking/src/api.js`
2. Import and use the API functions in `App.jsx`:

```js
import { authAPI, locationAPI, slotAPI, bookingAPI } from "./api";

// Example: login
const { token, user } = await authAPI.login(email, password);

// Example: get locations
const { data } = await locationAPI.getAll();

// Example: book a slot
const { data } = await bookingAPI.create(
  { slotId, locationId, date, startTime: "09:00", endTime: "11:00" },
  token
);
```

---

## 🌐 Testing with Postman / Thunder Client

Import these environment variables in Postman:
```
base_url  →  http://localhost:5000/api
token     →  (paste the JWT from login response)
```

Test flow:
1. `POST /auth/login` → copy the token
2. `GET /locations` → browse locations
3. `GET /locations/:id/slots?status=available` → find a free slot
4. `POST /bookings` → book it (with token)
5. `GET /bookings/my` → confirm your booking
