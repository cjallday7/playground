//App-wide TypeScript types and interfaces

// Jolpica API Types
export interface Driver {
  driverId: string
  code: string
  permanentNumber: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
  url: string
  teamId?: string
  headshotUrl?: string
  teamColor?: string
}

export interface Circuit {
  circuitId: string
  circuitName: string
  url: string
  Location: {
    lat: string
    long: string
    locality: string
    country: string
  }
}

export interface Race {
  season: string
  round: string
  raceName: string
  url: string
  Circuit: Circuit
  date: string
  time?: string
  FirstPractice?: { date: string; time: string }
  SecondPractice?: { date: string; time: string }
  ThirdPractice?: { date: string; time: string }
  Qualifying?: { date: string; time: string }
  Sprint?: { date: string; time: string }
}

export interface Constructor {
  constructorId: string
  name: string
  nationality: string
  url: string
}

export interface DriverStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export interface ConstructorStanding {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}

export interface RaceResult {
  season: string
  round: string
  raceName: string
  Circuit: Circuit
  date: string
  Results: {
    number: string
    position: string
    positionText: string
    points: string
    Driver: Driver
    Constructor: Constructor
    grid: string
    laps: string
    status: string
    Time?: { millis: string; time: string }
    FastestLap?: {
      rank: string
      lap: string
      Time: { time: string }
      AverageSpeed: { units: string; speed: string }
    }
  }[]
}

// OpenF1 API Types
export interface OpenF1Driver {
  driver_number: number
  broadcast_name: string
  full_name: string
  name_acronym: string
  team_name: string
  team_colour: string
  headshot_url: string
  country_code: string
  session_key: number
  meeting_key: number
}

export interface Lap {
  meeting_key: number
  session_key: number
  driver_number: number
  lap_number: number
  lap_duration: number | null
  is_pit_out_lap: boolean
  duration_sector_1: number | null
  duration_sector_2: number | null
  duration_sector_3: number | null
  i1_speed: number | null
  i2_speed: number | null
  st_speed: number | null
  date_start: string
}

export interface Position {
  meeting_key: number
  session_key: number
  driver_number: number
  date: string
  position: number
}

export interface PitStop {
  meeting_key: number
  session_key: number
  driver_number: number
  date: string
  pit_duration: number | null
  lap_number: number
}

export interface Stint {
  meeting_key: number
  session_key: number
  driver_number: number
  stint_number: number
  lap_start: number
  lap_end: number
  compound: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET' | 'UNKNOWN'
  tyre_age_at_start: number
}

export interface Weather {
  meeting_key: number
  session_key: number
  date: string
  air_temperature: number
  humidity: number
  pressure: number
  rainfall: number
  track_temperature: number
  wind_direction: number
  wind_speed: number
}