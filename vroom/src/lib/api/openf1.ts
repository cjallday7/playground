//OpenF1 API fetchers
// API Documentation: https://openf1.org

import type {
  OpenF1Driver,
  Lap,
  Position,
  PitStop,
  Stint,
  Weather,
} from '@/types'

const BASE_URL = 'https://api.openf1.org/v1'

export async function getDrivers(sessionKey?: string): Promise<OpenF1Driver[]> {
  const url = sessionKey
    ? `${BASE_URL}/drivers?session_key=${sessionKey}`
    : `${BASE_URL}/drivers?session_key=latest`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch drivers: ${response.statusText}`)
  }
  return response.json()
}

export async function getLapData(
  sessionKey: string,
  driverNumber?: number
): Promise<Lap[]> {
  let url = `${BASE_URL}/laps?session_key=${sessionKey}`
  if (driverNumber) {
    url += `&driver_number=${driverNumber}`
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch lap data: ${response.statusText}`)
  }
  return response.json()
}

export async function getPositions(sessionKey: string): Promise<Position[]> {
  const response = await fetch(
    `${BASE_URL}/position?session_key=${sessionKey}`
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch positions: ${response.statusText}`)
  }
  return response.json()
}

export async function getPitStops(sessionKey: string): Promise<PitStop[]> {
  const response = await fetch(`${BASE_URL}/pit?session_key=${sessionKey}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch pit stops: ${response.statusText}`)
  }
  return response.json()
}

export async function getStints(sessionKey: string): Promise<Stint[]> {
  const response = await fetch(`${BASE_URL}/stints?session_key=${sessionKey}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch stints: ${response.statusText}`)
  }
  return response.json()
}

export async function getWeather(sessionKey: string): Promise<Weather[]> {
  const response = await fetch(`${BASE_URL}/weather?session_key=${sessionKey}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.statusText}`)
  }
  return response.json()
}