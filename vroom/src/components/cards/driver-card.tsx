//Driver Information Card Component
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { FavoriteButton } from '@/components/favorites/favorite-button'
import { getTeamColor, COUNTRY_FLAGS } from '@/lib/constants'
import type { DriverStanding } from '@/types'

interface DriverCardProps {
  standing: DriverStanding
  showFavorite?: boolean
}

export function DriverCard({ standing, showFavorite = true }: DriverCardProps) {
  const { Driver, Constructors, position, points, wins } = standing
  const team = Constructors[0]
  const teamColor = team ? getTeamColor(team.constructorId) : '#6B7280'
  const flag = COUNTRY_FLAGS[Driver.nationality] ?? '🏎️'

  return (
    <Link href={`/drivers/${Driver.driverId}`}>
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
                  {flag} {Driver.nationality}
                </p>
                <h3 className="text-xl font-bold">
                  {Driver.givenName}{' '}
                  <span className="text-primary">{Driver.familyName}</span>
                </h3>
              </div>
            </div>
            {showFavorite && (
              <FavoriteButton id={Driver.driverId} type="driver" />
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {team?.name ?? 'Unknown Team'}
              </p>
              <div className="mt-2 flex items-center gap-3">
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
            <Badge 
              variant="secondary" 
              className="font-mono text-lg"
              style={{ 
                backgroundColor: `${teamColor}20`,
                color: teamColor,
                borderColor: teamColor 
              }}
            >
              #{Driver.permanentNumber || Driver.code}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function DriverCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <Skeleton className="h-9 w-9" />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Skeleton className="h-4 w-28 mb-3" />
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
      </CardContent>
    </Card>
  )
}