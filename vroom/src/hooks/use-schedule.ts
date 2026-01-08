//React Query hook for fetching and caching schedule data

import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/lib/api/jolpica";

export function useSchedule(season = 'current') {
  return useQuery({
    queryKey: ['schedule', season],
    queryFn: () => getSchedule(season),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get the next upcoming race from the schedule
export function useNextRace(season = 'current') {
  const { data: races, ...rest } = useSchedule(season)
  
  const nextRace = races?.find((race) => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`)
    return raceDate > new Date()
  })

  return {
    ...rest,
    data: nextRace,
  }
}