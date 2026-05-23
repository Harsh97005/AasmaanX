import { motion } from 'framer-motion'
import { wIcon, formatHour } from '../utils/weather'

export default function HourlyForecast({ forecastData, compact = false }) {
  if (!forecastData) return null

  const hours = forecastData.list.slice(0, compact ? 8 : 16)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      style={{
        background: 'rgba(20,30,51,0.7)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56,189,248,0.15)', borderRadius: 20, padding: 24,
        marginTop: compact ? 16 : 0,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 20 }}>
        {compact ? '24-Hour Forecast' : 'Hourly Forecast'}
      </div>
      <div style={{
        display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6,
        scrollbarWidth: 'thin',
      }}>
        {hours.map((h, i) => (
          <motion.div
            key={h.dt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            style={{
              minWidth: compact ? 80 : 100,
              background: i === 0 ? 'rgba(56,189,248,0.1)' : '#111827',
              border: `1px solid ${i === 0 ? 'rgba(56,189,248,0.5)' : 'rgba(56,189,248,0.1)'}`,
              borderRadius: 14, padding: compact ? '12px 8px' : '14px 10px',
              textAlign: 'center', flexShrink: 0, cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 11, color: '#475569', marginBottom: 6 }}>
              {i === 0 && compact ? 'Now' : formatHour(h.dt)}
            </div>
            <div style={{ fontSize: compact ? 22 : 28, margin: '6px 0' }}>
              {wIcon(h.weather[0].icon)}
            </div>
            <div style={{ fontSize: compact ? 14 : 16, fontWeight: 700, color: '#e2e8f0' }}>
              {Math.round(h.main.temp)}°
            </div>
            {!compact && (
              <>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 4, textTransform: 'capitalize' }}>
                  {h.weather[0].description}
                </div>
                <div style={{ fontSize: 11, color: '#38bdf8', marginTop: 2 }}>
                  💧{h.main.humidity}%
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
