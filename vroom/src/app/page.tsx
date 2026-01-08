//Paddock Page - Home Dashboard with Favorites and Quick Stats
'use client'

import { FavoritesGrid } from '@/components/favorites/favorites-grid'
import { StandingsCard } from '@/components/cards/standings-card'
import { NextRaceCard } from '@/components/cards/next-race-card'
import { Separator } from '@/components/ui/separator'

export default function PaddockPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">The Paddock</h1>
        <p className="text-muted-foreground">Your personal F1 dashboard</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Next Race + Favorites (takes 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Race Countdown */}
          <NextRaceCard />

          <Separator />

          {/* Favorites Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Your Favorites</h2>
            <FavoritesGrid />
          </section>
        </div>

        {/* Right Column - Standings Widgets */}
        <div className="space-y-6">
          <StandingsCard type="drivers" limit={5} />
          <StandingsCard type="constructors" limit={5} />
        </div>
      </div>
    </div>
  )
}
