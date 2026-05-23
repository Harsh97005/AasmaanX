export const WEATHER_ICONS = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '🌥️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
}

export function wIcon(code) {
  return WEATHER_ICONS[code] || '🌡️'
}

export function windDirection(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8] || 'N/A'
}

export function kmh(ms) {
  return Math.round(ms * 3.6)
}

export function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  })
}

export function formatHour(unix) {
  return new Date(unix * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: false
  })
}

export function formatDay(unix) {
  return new Date(unix * 1000).toLocaleDateString('en-US', { weekday: 'short' })
}

export function get5DayForecast(forecastData) {
  if (!forecastData) return []
  const days = {}
  forecastData.list.forEach(item => {
    const d = new Date(item.dt * 1000)
    const key = d.toDateString()
    if (!days[key]) days[key] = { temps: [], icons: [], descs: [], day: formatDay(item.dt) }
    days[key].temps.push(item.main.temp)
    days[key].icons.push(item.weather[0].icon)
    days[key].descs.push(item.weather[0].description)
  })
  return Object.values(days).slice(0, 5).map(d => ({
    day: d.day,
    hi: Math.round(Math.max(...d.temps)),
    lo: Math.round(Math.min(...d.temps)),
    icon: wIcon(d.icons[Math.floor(d.icons.length / 2)] || d.icons[0]),
    desc: d.descs[Math.floor(d.descs.length / 2)] || d.descs[0],
  }))
}

export function getUVLabel(uvi) {
  if (uvi >= 8) return { label: 'Very High', color: '#f87171' }
  if (uvi >= 6) return { label: 'High', color: '#fb923c' }
  if (uvi >= 3) return { label: 'Moderate', color: '#fbbf24' }
  return { label: 'Low', color: '#34d399' }
}
