//Next Race Countdown Card Component
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useNextRace } from '@/hooks/use-schedule'
import { Calendar, MapPin, Clock, Flag } from 'lucide-react'
import { COUNTRY_FLAGS } from '@/lib/constants'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(raceDate: Date): TimeLeft {
  const difference = raceDate.getTime() - new Date().getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-2xl font-bold tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="mt-1 text-xs text-muted-foreground uppercase">{label}</span>
    </div>
  )
}

export function NextRaceCard() {
  const { data: nextRace, isLoading, error } = useNextRace()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!nextRace) return

    const raceDate = new Date(`${nextRace.date}T${nextRace.time || '14:00:00Z'}`)
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft(raceDate))

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(raceDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [nextRace])

  if (isLoading || !mounted) {
    return <NextRaceCardSkeleton />
  }

  if (error || !nextRace) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Next Race
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No upcoming races scheduled</p>
        </CardContent>
      </Card>
    )
  }

  const raceDate = new Date(`${nextRace.date}T${nextRace.time || '14:00:00Z'}`)
  const countryFlag = COUNTRY_FLAGS[nextRace.Circuit.Location.country] ?? '🏁'
  
  // Format the race date
  const formattedDate = raceDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  
  const formattedTime = raceDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return (
    <Link href={`/races/${nextRace.season}/${nextRace.round}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-primary" />
              Next Race
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              Round {nextRace.round}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Race name and location */}
            <div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {countryFlag} {nextRace.raceName}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {nextRace.Circuit.circuitName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Countdown */}
            {timeLeft && (
              <div className="flex justify-center gap-3 pt-2">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
                <CountdownUnit value={timeLeft.seconds} label="Secs" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function NextRaceCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Next Race
          </CardTitle>
          <Skeleton className="h-5 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-7 w-48 mb-2" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <Skeleton className="h-3 w-8 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
