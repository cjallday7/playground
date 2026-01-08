//Jolpica API fetchers
// API Documentation: https://github.com/jolpica/jolpica-f1

import type {
  Race,
  Driver,
  DriverStanding,
  ConstructorStanding,
  RaceResult,
  Circuit,
} from '@/types'

const BASE_URL = 'https://api.jolpi.ca/ergast/f1'

interface JolpicaResponse<T> {
  MRData: {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable?: { season: string; Races: T[] }
    StandingsTable?: {
      season: string
      StandingsLists: {
        season: string
        round: string
        DriverStandings?: T[]
        ConstructorStandings?: T[]
      }[]
    }
    DriverTable?: { Drivers: T[] }
    CircuitTable?: { Circuits: T[] }
  }
}

export async function getSchedule(season = 'current'): Promise<Race[]> {
  const response = await fetch(`${BASE_URL}/${season}.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch schedule: ${response.statusText}`)
  }
  const data: JolpicaResponse<Race> = await response.json()
  return data.MRData.RaceTable?.Races ?? []
}

export async function getDriverStandings(
  season = 'current'
): Promise<DriverStanding[]> {
  const response = await fetch(`${BASE_URL}/${season}/driverStandings.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch driver standings: ${response.statusText}`)
  }
  const data: JolpicaResponse<DriverStanding> = await response.json()
  return data.MRData.StandingsTable?.StandingsLists[0]?.DriverStandings ?? []
}

export async function getConstructorStandings(
  season = 'current'
): Promise<ConstructorStanding[]> {
  const response = await fetch(
    `${BASE_URL}/${season}/constructorStandings.json`
  )
  if (!response.ok) {
    throw new Error(
      `Failed to fetch constructor standings: ${response.statusText}`
    )
  }
  const data: JolpicaResponse<ConstructorStanding> = await response.json()
  return (
    data.MRData.StandingsTable?.StandingsLists[0]?.ConstructorStandings ?? []
  )
}

export async function getRaceResults(
  season: string,
  round: string
): Promise<RaceResult | null> {
  const response = await fetch(`${BASE_URL}/${season}/${round}/results.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch race results: ${response.statusText}`)
  }
  const data: JolpicaResponse<RaceResult> = await response.json()
  return data.MRData.RaceTable?.Races[0] ?? null
}

export async function getDriver(driverId: string): Promise<Driver | null> {
  const response = await fetch(`${BASE_URL}/drivers/${driverId}.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch driver: ${response.statusText}`)
  }
  const data: JolpicaResponse<Driver> = await response.json()
  return data.MRData.DriverTable?.Drivers[0] ?? null
}

export async function getCircuits(): Promise<Circuit[]> {
  const response = await fetch(`${BASE_URL}/circuits.json?limit=100`)
  if (!response.ok) {
    throw new Error(`Failed to fetch circuits: ${response.statusText}`)
  }
  const data: JolpicaResponse<Circuit> = await response.json()
  return data.MRData.CircuitTable?.Circuits ?? []
}