//Favorites Grid Component for displaying favorite drivers and teams
'use client'

import Link from 'next/link'
import { useFavoritesStore } from '@/stores/use-favorites-store'
import { useDriverStandings, useConstructorStandings } from '@/hooks/use-standings'
import { DriverCard, DriverCardSkeleton } from '@/components/cards/driver-card'
import { TeamCard, TeamCardSkeleton } from '@/components/cards/team-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, Trophy, UserPlus, Building2 } from 'lucide-react'

export function FavoritesGrid() {
  const { favoriteDrivers, favoriteTeams } = useFavoritesStore()
  const { data: driverStandings, isLoading: driversLoading } = useDriverStandings()
  const { data: constructorStandings, isLoading: teamsLoading } = useConstructorStandings()

  const hasNoFavorites = favoriteDrivers.length === 0 && favoriteTeams.length === 0

  // Get favorite driver standings
  const favoriteDriverStandings = driverStandings?.filter(
    (standing) => favoriteDrivers.includes(standing.Driver.driverId)
  ) ?? []

  // Get favorite team standings
  const favoriteTeamStandings = constructorStandings?.filter(
    (standing) => favoriteTeams.includes(standing.Constructor.constructorId)
  ) ?? []

  if (hasNoFavorites) {
    return <EmptyFavoritesState />
  }

  return (
    <div className="space-y-8">
      {/* Favorite Drivers Section */}
      {favoriteDrivers.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Trophy className="h-5 w-5 text-primary" />
              Favorite Drivers
            </h2>
            <Link 
              href="/drivers" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View all drivers →
            </Link>
          </div>
          
          {driversLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteDrivers.map((id) => (
                <DriverCardSkeleton key={id} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteDriverStandings.map((standing) => (
                <DriverCard key={standing.Driver.driverId} standing={standing} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Favorite Teams Section */}
      {favoriteTeams.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Users className="h-5 w-5 text-primary" />
              Favorite Teams
            </h2>
            <Link 
              href="/teams" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View all teams →
            </Link>
          </div>
          
          {teamsLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTeams.map((id) => (
                <TeamCardSkeleton key={id} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTeamStandings.map((standing) => (
                <TeamCard key={standing.Constructor.constructorId} standing={standing} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function EmptyFavoritesState() {
  return (
    <Card className="border-dashed">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle>No Favorites Yet</CardTitle>
        <CardDescription className="max-w-md mx-auto">
          Start building your personal F1 dashboard by adding your favorite drivers and teams. 
          You&apos;ll see their stats and updates right here.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild>
          <Link href="/drivers" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Browse Drivers
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/teams" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Browse Teams
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}