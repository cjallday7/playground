//Mini Standings Card Component
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { getTeamColor } from '@/lib/constants'
import { useDriverStandings, useConstructorStandings } from '@/hooks/use-standings'
import { Trophy, Users } from 'lucide-react'

interface StandingsCardProps {
  type: 'drivers' | 'constructors'
  limit?: number
}

export function StandingsCard({ type, limit = 5 }: StandingsCardProps) {
  const { data: driverStandings, isLoading: driversLoading } = useDriverStandings()
  const { data: constructorStandings, isLoading: constructorsLoading } = useConstructorStandings()

  const isLoading = type === 'drivers' ? driversLoading : constructorsLoading
  const standings = type === 'drivers' 
    ? driverStandings?.slice(0, limit) 
    : constructorStandings?.slice(0, limit)

  const linkHref = type === 'drivers' ? '/drivers' : '/teams'
  const Icon = type === 'drivers' ? Trophy : Users

  if (isLoading) {
    return <StandingsCardSkeleton type={type} limit={limit} />
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5" />
            {type === 'drivers' ? 'Driver Standings' : 'Constructor Standings'}
          </CardTitle>
          <Link 
            href={linkHref}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {type === 'drivers' && driverStandings?.slice(0, limit).map((standing) => {
            const teamColor = standing.Constructors[0] 
              ? getTeamColor(standing.Constructors[0].constructorId)
              : '#6B7280'
            
            return (
              <Link
                key={standing.Driver.driverId}
                href={`/drivers/${standing.Driver.driverId}`}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: teamColor }}
                  >
                    {standing.position}
                  </span>
                  <div>
                    <p className="font-medium">
                      {standing.Driver.givenName} {standing.Driver.familyName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {standing.Constructors[0]?.name}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {standing.points} pts
                </Badge>
              </Link>
            )
          })}

          {type === 'constructors' && constructorStandings?.slice(0, limit).map((standing) => {
            const teamColor = getTeamColor(standing.Constructor.constructorId)
            
            return (
              <Link
                key={standing.Constructor.constructorId}
                href={`/teams/${standing.Constructor.constructorId}`}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: teamColor }}
                  >
                    {standing.position}
                  </span>
                  <p className="font-medium">{standing.Constructor.name}</p>
                </div>
                <Badge variant="secondary" className="font-mono">
                  {standing.points} pts
                </Badge>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function StandingsCardSkeleton({ type, limit = 5 }: StandingsCardProps) {
  const Icon = type === 'drivers' ? Trophy : Users
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {type === 'drivers' ? 'Driver Standings' : 'Constructor Standings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg p-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-28 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}