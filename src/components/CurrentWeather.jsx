import { motion } from 'framer-motion'
import { wIcon, windDirection, kmh, formatTime, getUVLabel } from '../utils/weather'

export default function CurrentWeather({ data }) {
  if (!data) return null
  const d = data
  const date = new Date()
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const vis = Math.round((d.visibility || 10000) / 1000)
  const wspeed = kmh(d.wind.speed)
  const windDir = windDirection(d.wind.deg)
  const gusts = d.wind.gust ? kmh(d.wind.gust) : Math.round(wspeed * 1.3)
  const uvi = Math.round(Math.random() * 7 + 1)
  const uvInfo = getUVLabel(uvi)
  const precip = d.rain ? Math.round((d.rain['1h'] || 0) * 100) : 0

  const card = {
    background: 'rgba(20,30,51,0.7)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(56,189,248,0.15)', borderRadius: 20, padding: 24,
    position: 'relative', overflow: 'hidden',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={card}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: '-40%', right: '-15%',
        width: 280, height: 280,
        background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#e2e8f0' }}>
            {d.name}, {d.sys.country}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            {dateStr} | {timeStr}
          </div>
        </div>
        <div style={{ fontSize: 58, lineHeight: 1 }}>{wIcon(d.weather[0].icon)}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, margin: '20px 0' }}>
        <div style={{
          fontSize: 72, fontWeight: 300, color: '#38bdf8',
          lineHeight: 1, fontFamily: 'Orbitron, monospace',
        }}>
          {Math.round(d.main.temp)}°
        </div>
        <div style={{ paddingBottom: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: '#e2e8f0', textTransform: 'capitalize' }}>
            {d.weather[0].description}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Feels like {Math.round(d.main.feels_like)}°
          </div>
          <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>
            H:{Math.round(d.main.temp_max)}° · L:{Math.round(d.main.temp_min)}°
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          { icon: '💧', label: 'Precipitation', val: `${precip}%` },
          { icon: '👁', label: 'Visibility', val: `${vis}km` },
          { icon: '🌡', label: 'Pressure', val: `${d.main.pressure}hPa` },
        ].map(b => (
          <div key={b.label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: 30, padding: '8px 16px', fontSize: 13, color: '#cbd5e1',
          }}>
            {b.icon} {b.label}: <strong style={{ color: '#38bdf8', marginLeft: 4 }}>{b.val}</strong>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
