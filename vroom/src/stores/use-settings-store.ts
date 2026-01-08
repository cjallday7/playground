//Theme, time format, units, etc.

interface SettingsState {
  timezone: string              // User's preferred timezone
  use24Hour: boolean            // Time format preference
  defaultSeason: string         // 'current' or specific year
}