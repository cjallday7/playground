//Constructor Team Information Card Component
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FavoriteButton } from '@/components/favorites/favorite-button'
import { getTeamColor, TEAM_NAMES, COUNTRY_FLAGS } from '@/lib/constants'
import { useDriverStandings } from '@/hooks/use-standings'
import type { ConstructorStanding } from '@/types'

interface TeamCardProps {
  standing: ConstructorStanding
  showFavorite?: boolean
}

export function TeamCard({ standing, showFavorite = true }: TeamCardProps) {
  const { Constructor, position, points, wins } = standing
  const teamColor = getTeamColor(Constructor.constructorId)
  const displayName = TEAM_NAMES[Constructor.constructorId] || Constructor.name
  const flag = COUNTRY_FLAGS[Constructor.nationality] ?? '🏎️'

  // Get the drivers for this team
  const { data: driverStandings } = useDriverStandings()
  const teamDrivers = driverStandings?.filter(
    (ds) => ds.Constructors[0]?.constructorId === Constructor.constructorId
  ) ?? []

  return (
    <Link href={`/teams/${Constructor.constructorId}`}>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        {/* Team color accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: teamColor }}
        />
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Position badge */}
              <div 
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: teamColor }}
              >
                {position}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {flag} {Constructor.nationality}
                </p>
                <h3 className="text-xl font-bold">{displayName}</h3>
              </div>
            </div>
            {showFavorite && (
              <FavoriteButton id={Constructor.constructorId} type="team" />
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {/* Team drivers */}
              <div className="mb-3 flex flex-wrap gap-2">
                {teamDrivers.map((driver) => (
                  <Badge 
                    key={driver.Driver.driverId}
                    variant="outline"
                    className="text-xs"
                  >
                    {driver.Driver.code || driver.Driver.familyName}
                  </Badge>
                ))}
                {teamDrivers.length === 0 && (
                  <Badge variant="outline" className="text-xs">
                    Loading...
                  </Badge>
                )}
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-2xl font-bold">{points}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold">{wins}</p>
                  <p className="text-xs text-muted-foreground">Wins</p>
                </div>
              </div>
            </div>

            {/* Team logo placeholder */}
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${teamColor}15` }}
            >
              <Image
                src={`/team-logos/${Constructor.constructorId}.png`}
                alt={`${Constructor.name} logo`}
                width={48}
                height={48}
                className="object-contain"
                onError={(e) => {
                  // Hide on error
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function TeamCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
          <Skeleton className="h-9 w-9" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-3 flex gap-2">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-14" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <Skeleton className="h-8 w-8 mb-1" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
          <Skeleton className="h-16 w-16 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}