"use client"

import { useState } from "react"

// Placeholder icons
const SearchIcon = () => <span>🔍</span>
const FilterIcon = () => <span>⚙️</span>
const GamepadIcon = () => <span>🎮</span>
const ClockIcon = () => <span>⏰</span>

export function GameLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock data
  const platforms = [
    { id: "all", name: "All Platforms", count: 147 },
    { id: "steam", name: "Steam", count: 89, color: "#00adee" },
    { id: "xbox", name: "Xbox", count: 34, color: "#9acd32" },
    { id: "playstation", name: "PlayStation", count: 18, color: "#0070d1" },
    { id: "nintendo", name: "Nintendo", count: 6, color: "#e60012" },
  ]

  const games = [
    {
      id: 1,
      name: "Elden Ring",
      platform: "steam",
      image: "/api/placeholder/100/140",
      playtime: 126,
      progress: 68,
      lastPlayed: "2h ago",
      rating: 9.5,
      achievements: { earned: 34, total: 50 }
    },
    {
      id: 2,
      name: "Spider-Man 2",
      platform: "playstation",
      image: "/api/placeholder/100/140",
      playtime: 87,
      progress: 94,
      lastPlayed: "1d ago",
      rating: 9.2,
      achievements: { earned: 47, total: 50 }
    },
    {
      id: 3,
      name: "Forza Horizon 5",
      platform: "xbox",
      image: "/api/placeholder/100/140",
      playtime: 203,
      progress: 45,
      lastPlayed: "3d ago",
      rating: 8.8,
      achievements: { earned: 128, total: 284 }
    },
    {
      id: 4,
      name: "The Legend of Zelda: Tears of the Kingdom",
      platform: "nintendo",
      image: "/api/placeholder/100/140",
      playtime: 342,
      progress: 78,
      lastPlayed: "1w ago",
      rating: 9.8,
      achievements: { earned: 89, total: 114 }
    },
    {
      id: 5,
      name: "Baldur's Gate 3",
      platform: "steam",
      image: "/api/placeholder/100/140",
      playtime: 156,
      progress: 32,
      lastPlayed: "2w ago",
      rating: 9.6,
      achievements: { earned: 23, total: 54 }
    },
    {
      id: 6,
      name: "God of War Ragnarök",
      platform: "playstation",
      image: "/api/placeholder/100/140",
      playtime: 98,
      progress: 88,
      lastPlayed: "3w ago",
      rating: 9.4,
      achievements: { earned: 44, total: 48 }
    }
  ]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "all" || game.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const formatPlaytime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    return `${hours}h`
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Game Library</h1>
        <p className="text-muted-foreground">Your unified gaming collection</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search your games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
        </div>

        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FilterIcon />
            <span>Filter:</span>
          </div>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedPlatform === platform.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {platform.name} ({platform.count})
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-card rounded-xl p-3 border border-border/50 hover:border-border transition-all duration-200 hover:shadow-lg group">
            <div className="space-y-3">
              {/* Game Cover */}
              <div className="aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
                  <GamepadIcon />
                </div>
              </div>

              {/* Game Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{game.platform}</span>
                  <div className="flex items-center space-x-1">
                    <ClockIcon />
                    <span>{formatPlaytime(game.playtime)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{game.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${game.progress}%` }}
                    />
                  </div>
                </div>

                {/* Achievements */}
                <div className="text-xs text-muted-foreground">
                  🏆 {game.achievements.earned}/{game.achievements.total} achievements
                </div>

                {/* Last Played */}
                <div className="text-xs text-muted-foreground">
                  Last played: {game.lastPlayed}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <GamepadIcon />
          <h3 className="text-lg font-medium mt-4">No games found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
} 