//Team colors, etc.

// F1 Team Colors (2024 season)
export const TEAM_COLORS: Record<string, string> = {
  red_bull: '#3671C6',
  ferrari: '#E8002D',
  mercedes: '#27F4D2',
  mclaren: '#FF8000',
  aston_martin: '#229971',
  alpine: '#FF87BC',
  williams: '#64C4FF',
  rb: '#6692FF',
  kick_sauber: '#52E252',
  haas: '#B6BABD',
  // Legacy/alternative IDs
  alphatauri: '#6692FF',
  alfa: '#52E252',
  sauber: '#52E252',
}

// Get team color with fallback
export function getTeamColor(constructorId: string): string {
  return TEAM_COLORS[constructorId.toLowerCase()] ?? '#6B7280'
}

// Team display names
export const TEAM_NAMES: Record<string, string> = {
  red_bull: 'Red Bull Racing',
  ferrari: 'Scuderia Ferrari',
  mercedes: 'Mercedes-AMG Petronas',
  mclaren: 'McLaren F1 Team',
  aston_martin: 'Aston Martin Aramco',
  alpine: 'Alpine F1 Team',
  williams: 'Williams Racing',
  rb: 'Visa Cash App RB',
  kick_sauber: 'Stake F1 Team Kick Sauber',
  haas: 'MoneyGram Haas F1 Team',
}

// Tire compound colors
export const COMPOUND_COLORS = {
  SOFT: '#FF0000',
  MEDIUM: '#FFCC00',
  HARD: '#FFFFFF',
  INTERMEDIATE: '#00CC00',
  WET: '#0066FF',
  UNKNOWN: '#808080',
} as const

// Country flag emoji mapping
export const COUNTRY_FLAGS: Record<string, string> = {
  British: '🇬🇧',
  Dutch: '🇳🇱',
  Spanish: '🇪🇸',
  Monegasque: '🇲🇨',
  Australian: '🇦🇺',
  Mexican: '🇲🇽',
  French: '🇫🇷',
  German: '🇩🇪',
  Finnish: '🇫🇮',
  Canadian: '🇨🇦',
  Japanese: '🇯🇵',
  Chinese: '🇨🇳',
  Thai: '🇹🇭',
  Danish: '🇩🇰',
  American: '🇺🇸',
  Italian: '🇮🇹',
  Austrian: '🇦🇹',
  Argentine: '🇦🇷',
  Brazilian: '🇧🇷',
  'New Zealander': '🇳🇿',
}