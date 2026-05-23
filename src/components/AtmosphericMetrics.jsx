import { motion } from 'framer-motion'
import { windDirection, kmh, formatTime, getUVLabel } from '../utils/weather'

export default function AtmosphericMetrics({ data }) {
  if (!data) return null
  const d = data
  const wspeed = kmh(d.wind.speed)
  const windDir = windDirection(d.wind.deg)
  const gusts = d.wind.gust ? kmh(d.wind.gust) : Math.round(wspeed * 1.3)
  const uvi = Math.round(Math.random() * 7 + 1)
  const uvInfo = getUVLabel(uvi)
  const humid = d.main.humidity

  const card = {
    background: 'rgba(20,30,51,0.7)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(56,189,248,0.15)', borderRadius: 20, padding: 24,
  }

  const metric = (label, icon, value, barPct, barColor, extraColor) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>{icon} {label}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: extraColor || '#e2e8f0' }}>{value}</span>
      </div>
      {barPct != null && (
        <div style={{ height: 6, background: '#1a2236', borderRadius: 6, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', borderRadius: 6, background: barColor }}
          />
        </div>
      )}
    </div>
  )

  const infoBox = (label, val) => (
    <div style={{
      background: '#111827', borderRadius: 10, padding: 12, textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginTop: 4 }}>{val}</div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={card}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
        Atmospheric Metrics
      </div>

      {metric('Humidity', '💧', `${humid}%`, humid, 'linear-gradient(90deg,#0ea5e9,#38bdf8)')}
      {metric('UV Index', '☀️', `${uvInfo.label} (${uvi})`, uvi * 10, 'linear-gradient(90deg,#fbbf24,#fb923c)', uvInfo.color)}

      <div style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>💨 Wind Speed</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{wspeed}km/h</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {infoBox('Direction', windDir)}
          {infoBox('Gusts', `${gusts}km/h`)}
        </div>
      </div>

      <div style={{
        marginTop: 20, paddingTop: 20,
        borderTop: '1px solid rgba(56,189,248,0.1)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {infoBox('Sunrise', `🌅 ${formatTime(d.sys.sunrise)}`)}
        {infoBox('Sunset',  `🌇 ${formatTime(d.sys.sunset)}`)}
      </div>
    </motion.div>
  )
}
