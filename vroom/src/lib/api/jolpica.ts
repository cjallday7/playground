//Jolpica API fetchers

export async function getSchedule(season = 'current'): Promise<Race[]>
export async function getDriverStandings(season = 'current'): Promise<Standing[]>
export async function getConstructorStandings(season = 'current'): Promise<Standing[]>
export async function getRaceResults(season: string, round: string): Promise<RaceResult>
export async function getDriver(driverId: string): Promise<Driver>
export async function getCircuits(): Promise<Circuit[]>