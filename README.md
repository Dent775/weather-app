# 🌦️ Weather App

A modern and responsive weather application built using React, TypeScript, and Vite. The app provides real-time weather information, hourly and daily forecasts, air pollution data, and interactive weather maps with multiple layers.

🔗 Live Demo: https://weather-app-nu-three-69.vercel.app/

---

## ✨ Features

- 📍 Real-time location-based weather
- 🌡️ Current temperature and weather conditions
- 🕒 Hourly weather forecast
- 📅 7-day forecast
- 🌫️ Air pollution and AQI information
- 🗺️ Interactive weather maps using Leaflet
- 🌧️ Multiple map layers:
  - Rain
  - Clouds
  - Precipitation
  - Temperature
  - Wind
- 📱 Fully responsive UI
- ⚡ Fast API fetching and caching using React Query
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🧭 Mobile side panel navigation
- ⏳ Skeleton loading states

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Leaflet
- React Leaflet
- Zod

### APIs
- OpenWeather API

### Deployment
- Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create environment variables

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```

---

### 4. Run development server

```bash
npm run dev
```

---

### 5. Build for production

```bash
npm run build
```

---

## 🧩 Project Highlights

- Implemented efficient API caching and stale-time management using React Query
- Built responsive dashboard layout with mobile-first design
- Used TypeScript for strong type safety and maintainability
- Integrated interactive weather maps with selectable layers
- Added skeleton loading states for smoother user experience
- Configured Leaflet marker assets properly for Vite production deployment

---

## 🌐 Deployment

The project is deployed on Vercel:

https://weather-app-nu-three-69.vercel.app/

---

## 📄 License

This project is for learning and portfolio purposes.
