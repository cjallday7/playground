//OpenF1 API fetchers

import type { OpenF1Driver, Lap, Position, PitStop, Stint, Weather } from '@/types'

export async function getDrivers(sessionKey?: string): Promise<OpenF1Driver[]>
export async function getLapData(sessionKey: string, driverNumber?: number): Promise<Lap[]>
export async function getPositions(sessionKey: string): Promise<Position[]>
export async function getPitStops(sessionKey: string): Promise<PitStop[]>
export async function getStints(sessionKey: string): Promise<Stint[]>
export async function getWeather(sessionKey: string): Promise<Weather[]>