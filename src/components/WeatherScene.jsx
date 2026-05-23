import { useMemo } from 'react'

function SunAnimation() {
  return (
    <div style={{ position: 'absolute', right: 80, top: 20, width: 130, height: 130 }}>
      <div className="sun-glow" style={{
        position: 'absolute', inset: -25, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)'
      }} />
      <svg viewBox="0 0 100 100" style={{ width: 130, height: 130 }}>
        <circle cx="50" cy="50" r="22" fill="#fbbf24"
          style={{ filter: 'drop-shadow(0 0 18px rgba(251,191,36,0.9))' }} />
        <g className="sun-ray">
          {[0,45,90,135,180,225,270,315].map(a => (
            <line key={a} x1="50" y1="6" x2="50" y2="18"
              stroke="#fde68a" strokeWidth="3" strokeLinecap="round"
              transform={`rotate(${a} 50 50)`} />
          ))}
        </g>
      </svg>
    </div>
  )
}

function MoonAnimation() {
  return (
    <div style={{
      position: 'absolute', right: 80, top: 20,
      fontSize: 90, lineHeight: 1,
      filter: 'drop-shadow(0 0 24px rgba(251,191,36,0.5))',
      animation: 'glowPulse 3s ease-in-out infinite'
    }}>🌙</div>
  )
}

function Cloud({ left, top, scaleX = 1, scaleY = 1, animDuration = 0 }) {
  return (
    <div className={animDuration ? 'cloud-drift' : ''}
      style={{
        position: 'absolute', left, top,
        animationDuration: animDuration ? `${animDuration}s` : undefined
      }}>
      <svg viewBox="0 0 130 75"
        width={130 * scaleX} height={75 * scaleY}
        style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))' }}>
        <ellipse cx="42" cy="58" rx="36" ry="20" fill="rgba(100,130,180,0.6)" />
        <ellipse cx="80" cy="58" rx="32" ry="18" fill="rgba(100,130,180,0.6)" />
        <ellipse cx="58" cy="42" rx="30" ry="24" fill="rgba(120,150,200,0.7)" />
        <ellipse cx="85" cy="48" rx="24" ry="20" fill="rgba(120,150,200,0.65)" />
        <ellipse cx="36" cy="50" rx="20" ry="16" fill="rgba(130,160,210,0.65)" />
      </svg>
    </div>
  )
}

function RainDrops({ count = 28 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const h = Math.random() * 28 + 18
        return (
          <div key={i} className="raindrop" style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: -h,
            width: 2, height: h,
            borderRadius: 2,
            background: 'linear-gradient(180deg, transparent, rgba(125,211,252,0.8))',
            animationDuration: `${Math.random() * 0.5 + 0.45}s`,
            animationDelay: `${Math.random() * 1.2}s`,
          }} />
        )
      })}
    </>
  )
}

function Snowflakes({ count = 20 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="snowflake" style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: -20,
          fontSize: Math.random() * 12 + 8,
          color: 'rgba(200,230,255,0.95)',
          animationDuration: `${Math.random() * 2 + 2.5}s`,
          animationDelay: `${Math.random() * 2}s`,
        }}>❄</div>
      ))}
    </>
  )
}

function LightningBolt() {
  return (
    <div className="lightning-bolt" style={{ position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)' }}>
      <svg viewBox="0 0 40 90" width="40" height="90">
        <polyline points="28,0 10,44 23,44 14,90"
          fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeLinejoin="round" />
        <polyline points="28,0 10,44 23,44 14,90"
          fill="none" stroke="rgba(253,230,138,0.4)" strokeWidth="9" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Stars() {
  return (
    <>
      {Array.from({ length: 32 }, (_, i) => {
        const size = Math.random() * 2 + 1
        return (
          <div key={i} className="star" style={{
            position: 'absolute',
            width: size, height: size,
            background: '#fff',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 65}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        )
      })}
    </>
  )
}

function FogLayers() {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="fog-layer" style={{
          position: 'absolute',
          left: '-110%', top: 30 + i * 30,
          width: '90%', height: 38,
          background: 'linear-gradient(90deg, transparent, rgba(180,190,210,0.32), transparent)',
          borderRadius: '50%',
          animationDuration: `${9 + i * 3}s`,
          animationDelay: `${-i * 1.8}s`,
        }} />
      ))}
    </>
  )
}

export default function WeatherScene({ iconCode }) {
  const code = iconCode ? iconCode.substring(0, 2) : '01'
  const isDay = iconCode ? iconCode.endsWith('d') : true

  const skyGradient = isDay
    ? 'linear-gradient(180deg,#0c1e3d 0%,#1a3a5c 50%,#2a5070 100%)'
    : 'linear-gradient(180deg,#020611 0%,#0a0f1e 55%,#111827 100%)'

  const scene = useMemo(() => {
    switch (code) {
      case '01': return isDay ? 'clear-day' : 'clear-night'
      case '02': return isDay ? 'few-clouds-day' : 'few-clouds-night'
      case '03': return 'cloudy'
      case '04': return 'overcast'
      case '09': return 'rain'
      case '10': return isDay ? 'light-rain-day' : 'rain'
      case '11': return 'thunder'
      case '13': return 'snow'
      case '50': return 'fog'
      default: return 'clear-day'
    }
  }, [code, isDay])

  return (
    <div style={{
      position: 'relative', height: 220, overflow: 'hidden',
      background: skyGradient,
    }}>
      {!isDay && <Stars />}

      {scene === 'clear-day' && <SunAnimation />}
      {scene === 'clear-night' && <MoonAnimation />}

      {scene === 'few-clouds-day' && (
        <>
          <div style={{ position: 'absolute', right: 140, top: 22 }}>
            <svg viewBox="0 0 80 80" width={80} height={80}>
              <circle cx="40" cy="40" r="20" fill="#fbbf24"
                style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.8))' }} />
            </svg>
          </div>
          <Cloud left={50} top={30} scaleX={1.2} scaleY={0.85} animDuration={6} />
          <Cloud left={240} top={55} scaleX={0.9} scaleY={0.75} animDuration={8} />
        </>
      )}

      {scene === 'few-clouds-night' && (
        <>
          <MoonAnimation />
          <Cloud left={60} top={45} scaleX={1.1} scaleY={0.8} animDuration={7} />
        </>
      )}

      {scene === 'cloudy' && (
        <>
          <Cloud left={20} top={20} scaleX={1.3} scaleY={0.9} animDuration={7} />
          <Cloud left={200} top={40} scaleX={1.0} scaleY={0.8} animDuration={9} />
        </>
      )}

      {scene === 'overcast' && (
        <>
          <Cloud left={-20} top={10} scaleX={1.5} scaleY={1.0} animDuration={8} />
          <Cloud left={160} top={15} scaleX={1.3} scaleY={0.9} animDuration={6} />
          <Cloud left={80} top={55} scaleX={1.1} scaleY={0.8} animDuration={10} />
        </>
      )}

      {(scene === 'rain' || scene === 'light-rain-day') && (
        <>
          {scene === 'light-rain-day' && (
            <div style={{ position: 'absolute', right: 150, top: 20 }}>
              <svg viewBox="0 0 70 70" width={70} height={70}>
                <circle cx="35" cy="35" r="18" fill="#fbbf24"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.7))' }} />
              </svg>
            </div>
          )}
          <Cloud left={20} top={8} scaleX={1.5} scaleY={0.9} />
          <Cloud left={180} top={18} scaleX={1.2} scaleY={0.85} />
          <RainDrops count={30} />
        </>
      )}

      {scene === 'thunder' && (
        <>
          <Cloud left={10} top={5} scaleX={1.6} scaleY={0.95} />
          <Cloud left={190} top={14} scaleX={1.3} scaleY={0.88} />
          <RainDrops count={22} />
          <LightningBolt />
        </>
      )}

      {scene === 'snow' && (
        <>
          <Cloud left={30} top={8} scaleX={1.4} scaleY={0.88} />
          <Cloud left={210} top={20} scaleX={1.1} scaleY={0.8} />
          <Snowflakes count={22} />
        </>
      )}

      {scene === 'fog' && <FogLayers />}
    </div>
  )
}
