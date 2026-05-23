import { useState, useCallback } from 'react'

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
const BASE = 'https://api.openweathermap.org/data/2.5'

export function useWeather() {
  const [current, setCurrent] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const fetchByCity = useCallback(async (city) => {
    setStatus('loading')
    setError('')
    try {
      const [curRes, foreRes] = await Promise.all([
        fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`),
        fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`)
      ])
      const curData = await curRes.json()
      const foreData = await foreRes.json()
      if (curData.cod !== 200) throw new Error(curData.message || 'City not found')
      setCurrent(curData)
      setForecast(foreData)
      setStatus('success')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [])

  const fetchByCoords = useCallback(async (lat, lon) => {
    setStatus('loading')
    setError('')
    try {
      const [curRes, foreRes] = await Promise.all([
        fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
        fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      ])
      const curData = await curRes.json()
      const foreData = await foreRes.json()
      if (curData.cod !== 200) throw new Error(curData.message || 'Location error')
      setCurrent(curData)
      setForecast(foreData)
      setStatus('success')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }, [])

  return { current, forecast, status, error, fetchByCity, fetchByCoords }
}
