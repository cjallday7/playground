//Standings data hook using React Query

import { useQuery } from "@tanstack/react-query";
import { getDriverStandings, getConstructorStandings } from "@/lib/api/jolpica";

export function useDriverStandings(season = 'current') {
  return useQuery({
    queryKey: ['driver-standings', season],
    queryFn: () => getDriverStandings(season),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useConstructorStandings(season = 'current') {
  return useQuery({
    queryKey: ['constructor-standings', season],
    queryFn: () => getConstructorStandings(season),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}