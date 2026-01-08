//App-wide TypeScript types and interfaces

interface Driver {
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

interface Race {
  season: string
  round: string
  raceName: string
  circuitId: string
  circuitName: string
  date: string
  time: string
  locality: string
  country: string
  lat: string
  long: string
}

interface Constructor {
  constructorId: string
  name: string
  nationality: string
  url: string
}

interface Standing {
  position: string
  positionText: string
  points: string
  wins: string
  driver: Driver
  constructors: Constructor[]
}

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
  // define lap properties
}

export interface Position {
  // define position properties
}

export interface PitStop {
  // define pit stop properties
}

export interface Stint {
  // define stint properties
}

export interface Weather {
  // define weather properties
}