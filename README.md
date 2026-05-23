# ⬡ Aether Weather

A modern, high-precision weather dashboard built with React, Vite, Tailwind CSS, and the OpenWeatherMap API.

## Features

- 🌤 **Live Weather** — Current conditions from OpenWeatherMap
- 🔍 **City Search** — Search any city worldwide
- 📍 **Geolocation** — Auto-detect your location
- 📅 **5-Day Forecast** — Extended weather outlook
- 🕐 **Hourly Forecast** — 48-hour breakdown
- 🌧 **Weather Animations** — Dynamic scenes: sunny, rainy, snowy, foggy, thunderstorms, night sky
- 🎨 **Glassmorphism UI** — Dark/light mode with particle background
- 🎬 **Framer Motion** — Smooth page and component animations
- 📱 **Responsive** — Works on all screen sizes

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key (optional — default key included)
The app ships with a working API key. To use your own, edit:
```
src/hooks/useWeather.js
```
Replace `API_KEY` with your key from [openweathermap.org](https://openweathermap.org/api)

### 3. Run dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production
```bash
npm run build
npm run preview
```

## Project Structure
```
aether-weather/
├── src/
│   ├── components/
│   │   ├── ParticleBackground.jsx   # Animated particle canvas
│   │   ├── WeatherScene.jsx         # Dynamic weather animation (sun/rain/snow...)
│   │   ├── Header.jsx               # Search, geolocation, dark mode
│   │   ├── NavTabs.jsx              # Current / Hourly / 5-Day tabs
│   │   ├── CurrentWeather.jsx       # Main weather card
│   │   ├── AtmosphericMetrics.jsx   # Humidity, UV, wind panel
│   │   ├── HourlyForecast.jsx       # Horizontal scroll hourly cards
│   │   ├── FiveDayForecast.jsx      # 5-day grid/list
│   │   ├── StatusBar.jsx            # Bottom status info
│   │   └── LoadingError.jsx         # Loading / error / idle states
│   ├── hooks/
│   │   └── useWeather.js            # Weather data fetching hook
│   ├── utils/
│   │   └── weather.js               # Helpers: icons, wind direction, formatting
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles + animations
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS** — utility styling
- **Framer Motion** — animations
- **OpenWeatherMap API** — weather data
