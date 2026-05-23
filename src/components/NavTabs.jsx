const TABS = ['current', 'hourly', 'forecast']

export default function NavTabs({ active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: '16px 24px 0',
      borderBottom: '1px solid rgba(56,189,248,0.12)',
    }}>
      {TABS.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            padding: '10px 22px',
            borderRadius: '10px 10px 0 0',
            background: active === t ? 'rgba(20,30,51,0.9)' : 'transparent',
            border: active === t ? '1px solid rgba(56,189,248,0.18)' : '1px solid transparent',
            borderBottom: active === t ? '1px solid rgba(20,30,51,0.9)' : 'none',
            color: active === t ? '#38bdf8' : '#64748b',
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            textTransform: 'capitalize',
            transition: 'all 0.2s',
          }}
        >
          {t === 'forecast' ? '5-Day' : t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  )
}
