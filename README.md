# ParkIQ – Smart Parking Slot Booking System

A full-featured smart parking web app built with React + Vite.

## 🚀 Setup & Run

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Steps

```bash
# 1. Open this folder in VS Code terminal (Ctrl + `)

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the dev server
npm run dev

# 4. Open your browser at:
#    http://localhost:5173
```

You can also start the frontend from the project root:

```bash
npm run dev
```

To start the backend API from the project root:

```bash
npm run api
```

## 🔑 Demo Credentials

| Role  | Email              | Password   |
|-------|--------------------|------------|
| Admin | admin@park.io      | admin123   |
| User  | rahib@mail.com     | pass123    |

## 📋 Features

- **User** – Browse locations, view real-time slot grid, book a slot, get booking ID, dashboard to manage bookings
- **Admin** – Overview stats, add locations, manage all bookings, view users

## 🗂 Project Structure

```
smart-parking/
├── index.html          # HTML entry point
├── vite.config.js      # Vite config
├── package.json
└── src/
    ├── main.jsx        # React DOM render
    └── App.jsx         # All components (single file)
```

## 🛠 Tech Stack

- React 18
- Vite 5
- Inline CSS (no external UI library needed)
- Google Fonts (Syne, DM Sans, DM Mono)
