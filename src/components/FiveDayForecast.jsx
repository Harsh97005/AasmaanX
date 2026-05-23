import { motion } from 'framer-motion'
import { get5DayForecast } from '../utils/weather'

export default function FiveDayForecast({ forecastData, compact = false }) {
  if (!forecastData) return null

  const days = get5DayForecast(forecastData)

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: 'rgba(20,30,51,0.7)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(56,189,248,0.15)', borderRadius: 20, padding: 24,
          marginTop: 16,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }}>5-Day Forecast</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {days.map((d, i) => (
            <motion.div
              key={d.day + i}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 10, background: '#111827',
                borderRadius: 12, border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div style={{ width: 38, fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>{d.day}</div>
              <div style={{ fontSize: 22 }}>{d.icon}</div>
              <div style={{ flex: 1, fontSize: 12, color: '#475569', textTransform: 'capitalize' }}>{d.desc}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{d.hi}°</div>
              <div style={{ fontSize: 13, color: '#475569' }}>{d.lo}°</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        background: 'rgba(20,30,51,0.7)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56,189,248,0.15)', borderRadius: 20, padding: 24,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 20 }}>5-Day Forecast</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
        {days.map((d, i) => (
          <motion.div
            key={d.day + i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(56,189,248,0.5)' }}
            style={{
              background: '#111827',
              border: '1px solid rgba(56,189,248,0.1)',
              borderRadius: 14, padding: '16px 12px', textAlign: 'center', cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>{d.day}</div>
            <div style={{ fontSize: 28, margin: '6px 0' }}>{d.icon}</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>
              <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{d.hi}°</span>
              <span style={{ color: '#475569', marginLeft: 4 }}>/ {d.lo}°</span>
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 4, textTransform: 'capitalize' }}>{d.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
