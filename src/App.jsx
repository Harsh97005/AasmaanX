import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import ParticleBackground from './components/ParticleBackground'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import WeatherScene from './components/WeatherScene'
import CurrentWeather from './components/CurrentWeather'
import AtmosphericMetrics from './components/AtmosphericMetrics'
import HourlyForecast from './components/HourlyForecast'
import FiveDayForecast from './components/FiveDayForecast'
import StatusBar from './components/StatusBar'
import { LoadingState, ErrorState, IdleState } from './components/LoadingError'
import { useWeather } from './hooks/useWeather'

export default function App() {
  const [activeTab, setActiveTab] = useState('current')
  const [darkMode, setDarkMode] = useState(true)
  const { current, forecast, status, error, fetchByCity, fetchByCoords } = useWeather()

  // Attempt geolocation on mount, fallback to London
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchByCity('London'),
        { timeout: 5000 }
      )
    } else {
      fetchByCity('London')
    }
  }, [])

  const iconCode = current?.weather[0]?.icon || '01d'

  const bg = darkMode ? '#0a0f1e' : '#f1f5f9'
  const textColor = darkMode ? '#e2e8f0' : '#0f172a'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: textColor, position: 'relative' }}>
      <ParticleBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header
          onSearch={fetchByCity}
          onGeo={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
                () => alert('Location access denied')
              )
            }
          }}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
        />

        <NavTabs active={activeTab} onChange={setActiveTab} />

        {/* Weather animation scene */}
        <WeatherScene iconCode={status === 'success' ? iconCode : '01d'} />

        {/* Main content */}
        <div style={{ padding: '20px 24px', minHeight: 300 }}>
          <AnimatePresence mode="wait">
            {status === 'idle' && <IdleState key="idle" />}
            {status === 'loading' && <LoadingState key="loading" />}
            {status === 'error' && (
              <ErrorState key="error" message={error} onRetry={() => fetchByCity('London')} />
            )}
            {status === 'success' && (
              <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {activeTab === 'current' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) 320px',
                    gap: 20,
                  }}
                    className="responsive-grid"
                  >
                    <div>
                      <CurrentWeather data={current} />
                      <HourlyForecast forecastData={forecast} compact />
                    </div>
                    <div>
                      <AtmosphericMetrics data={current} />
                      <FiveDayForecast forecastData={forecast} compact />
                    </div>
                  </div>
                )}
                {activeTab === 'hourly' && (
                  <HourlyForecast forecastData={forecast} />
                )}
                {activeTab === 'forecast' && (
                  <FiveDayForecast forecastData={forecast} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <StatusBar current={current} />
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        @media (max-width: 900px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
