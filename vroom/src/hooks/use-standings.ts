//Standings data hook using React Query

import { getDriverStandings } from "@/lib/api/jolpica";

// hooks/use-standings.ts
export function useDriverStandings() {
  return useQuery({
    queryKey: ['driver-standings'],
    queryFn: () => getDriverStandings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}