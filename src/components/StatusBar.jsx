export default function StatusBar({ current }) {
  const now = new Date().toLocaleTimeString()
  const stationId = current
    ? `${current.name.toUpperCase().replace(/\s/g, '-')}-01`
    : 'AUTO'
  const lat = current ? `Lat: ${current.coord.lat.toFixed(2)}°` : ''

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 24px',
      background: 'rgba(10,15,30,0.7)',
      borderTop: '1px solid rgba(56,189,248,0.1)',
      fontSize: 12, color: '#475569',
    }}>
      <span>Station: {stationId} {lat && `• ${lat}`}</span>
      <span>Updated: {now}</span>
      <span>
        <span className="status-dot" style={{
          display: 'inline-block', width: 7, height: 7,
          borderRadius: '50%', background: '#34d399', marginRight: 5,
        }} />
        System Online
      </span>
    </div>
  )
}
