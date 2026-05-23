import { motion } from 'framer-motion'

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16 }}
    >
      <div className="spinner" />
      <div style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0' }}>Fetching weather data...</div>
      <div style={{ fontSize: 14, color: '#64748b' }}>Connecting to atmospheric sensors</div>
    </motion.div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16, textAlign: 'center' }}
    >
      <div style={{ fontSize: 44 }}>⚠️</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0' }}>Unable to fetch weather</div>
      <div style={{ fontSize: 14, color: '#64748b' }}>{message || 'Check city name or try again'}</div>
      {onRetry && (
        <button onClick={onRetry} style={{
          marginTop: 8, padding: '10px 24px', background: '#0ea5e9', border: 'none',
          borderRadius: 10, color: '#fff', fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 14, fontWeight: 600, cursor: 'pointer',
        }}>
          Try Again
        </button>
      )}
    </motion.div>
  )
}

export function IdleState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16, textAlign: 'center' }}
    >
      <div style={{ fontSize: 56 }}>🌍</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0' }}>Detecting your location...</div>
      <div style={{ fontSize: 14, color: '#64748b' }}>Or search for any city above</div>
    </motion.div>
  )
}
