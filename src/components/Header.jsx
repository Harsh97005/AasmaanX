import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header({ onSearch, onGeo, darkMode, onToggleDark }) {
  const [query, setQuery] = useState('')

  function handleSearch() {
    if (query.trim()) { onSearch(query.trim()); setQuery('') }
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'rgba(10,15,30,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56,189,248,0.15)',
        position: 'sticky', top: 0, zIndex: 100,
        gap: 16,
      }}
    >
      {/* Logo */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontFamily: 'Orbitron,monospace', fontSize: 15, fontWeight: 700, color: '#38bdf8', letterSpacing: 3 }}>
          ⬡ AasmaanX
        </div>
        <div style={{ fontSize: 9, color: '#475569', letterSpacing: 2, marginTop: 2 }}>HIGH-PRECISION WEATHER</div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 420 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Search city..."
          style={{
            flex: 1, background: '#1a2236', border: '1px solid rgba(56,189,248,0.18)',
            borderRadius: 12, padding: '10px 16px', color: '#e2e8f0',
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, outline: 'none',
          }}
        />
        <button onClick={handleSearch} style={{
          padding: '10px 18px', background: '#0ea5e9', border: 'none',
          borderRadius: 10, color: '#fff', fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          Search
        </button>
        <button onClick={onGeo} title="Use my location" style={{
          padding: '10px 13px', background: '#1a2236', border: '1px solid rgba(56,189,248,0.18)',
          borderRadius: 10, color: '#38bdf8', cursor: 'pointer', fontSize: 16,
        }}>
          📍
        </button>
      </div>

      {/* Dark mode */}
      <button onClick={onToggleDark} style={{
        padding: '8px 14px', background: '#1a2236', border: '1px solid rgba(56,189,248,0.18)',
        borderRadius: 10, color: '#94a3b8', cursor: 'pointer',
        fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, flexShrink: 0,
      }}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </motion.header>
  )
}
