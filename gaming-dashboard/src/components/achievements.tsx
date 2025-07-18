"use client"

import { useState } from "react"

// Placeholder icons
const TrophyIcon = () => <span>🏆</span>
const FilterIcon = () => <span>⚙️</span>
const StarIcon = () => <span>⭐</span>
const CalendarIcon = () => <span>📅</span>
const SearchIcon = () => <span>🔍</span>

export function Achievements() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Mock data
  const rarities = [
    { id: "all", name: "All Rarities", count: 412 },
    { id: "common", name: "Common", count: 189, color: "text-gray-400" },
    { id: "uncommon", name: "Uncommon", count: 134, color: "text-green-400" },
    { id: "rare", name: "Rare", count: 67, color: "text-blue-400" },
    { id: "epic", name: "Epic", count: 18, color: "text-purple-400" },
    { id: "legendary", name: "Legendary", count: 4, color: "text-yellow-400" },
  ]

  const platforms = [
    { id: "all", name: "All Platforms" },
    { id: "steam", name: "Steam" },
    { id: "xbox", name: "Xbox" },
    { id: "playstation", name: "PlayStation" },
    { id: "nintendo", name: "Nintendo" },
  ]

  const achievements = [
    {
      id: 1,
      name: "Elden Lord",
      description: "Obtained all other trophies",
      game: "Elden Ring",
      platform: "steam",
      rarity: "legendary",
      unlockedAt: new Date("2024-01-15T14:30:00"),
      points: 100,
      icon: "/api/placeholder/50/50",
      completionRate: 2.1
    },
    {
      id: 2,
      name: "Dragon Slayer",
      description: "Defeated the Ancient Dragon",
      game: "Elden Ring",
      platform: "steam",
      rarity: "epic",
      unlockedAt: new Date("2024-01-15T12:45:00"),
      points: 80,
      icon: "/api/placeholder/50/50",
      completionRate: 8.5
    },
    {
      id: 3,
      name: "Web-Slinger Supreme",
      description: "Complete the story on Amazing difficulty",
      game: "Spider-Man 2",
      platform: "playstation",
      rarity: "rare",
      unlockedAt: new Date("2024-01-14T20:15:00"),
      points: 60,
      icon: "/api/placeholder/50/50",
      completionRate: 15.3
    },
    {
      id: 4,
      name: "Speed Demon",
      description: "Reach maximum speed in a hypercar",
      game: "Forza Horizon 5",
      platform: "xbox",
      rarity: "uncommon",
      unlockedAt: new Date("2024-01-13T16:20:00"),
      points: 40,
      icon: "/api/placeholder/50/50",
      completionRate: 32.7
    },
    {
      id: 5,
      name: "Explorer",
      description: "Discover 50 locations",
      game: "The Legend of Zelda: TOTK",
      platform: "nintendo",
      rarity: "common",
      unlockedAt: new Date("2024-01-12T11:30:00"),
      points: 20,
      icon: "/api/placeholder/50/50",
      completionRate: 67.2
    }
  ]

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === "all" || achievement.rarity === selectedRarity
    const matchesPlatform = selectedPlatform === "all" || achievement.platform === selectedPlatform
    return matchesSearch && matchesRarity && matchesPlatform
  })

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '👑'
      case 'epic': return '💎'
      case 'rare': return '💙'
      case 'uncommon': return '💚'
      case 'common': return '🪙'
      default: return '🏆'
    }
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Achievements & Trophies</h1>
        <p className="text-muted-foreground">Your gaming accomplishments across all platforms</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {rarities.map((rarity) => (
          <div key={rarity.id} className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="text-center space-y-2">
              <div className={`text-2xl ${rarity.color || ''}`}>
                {getRarityIcon(rarity.id)}
              </div>
              <div>
                <p className="text-2xl font-bold">{rarity.count}</p>
                <p className="text-sm text-muted-foreground">{rarity.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FilterIcon />
            <span>Filter:</span>
          </div>
          
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {rarities.map((rarity) => (
              <option key={rarity.id} value={rarity.id}>
                {rarity.name}
              </option>
            ))}
          </select>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="recent">Recently Earned</option>
            <option value="rarity">Rarity</option>
            <option value="points">Points</option>
            <option value="game">Game</option>
          </select>
        </div>
      </div>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start space-x-4">
              {/* Achievement Icon */}
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <TrophyIcon />
              </div>

              {/* Achievement Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">{achievement.name}</h3>
                      <p className="text-muted-foreground text-sm">{achievement.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Game:</span>
                        <span className="font-medium">{achievement.game}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="capitalize font-medium">{achievement.platform}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon />
                        <span className="text-muted-foreground">{formatDate(achievement.unlockedAt)}</span>
                      </div>
                      
                      <div className="text-muted-foreground">
                        {achievement.completionRate}% of players have this
                      </div>
                    </div>
                  </div>

                  {/* Rarity and Points */}
                  <div className="text-right space-y-2 flex-shrink-0">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary ${
                      achievement.rarity === 'legendary' ? 'text-yellow-400' :
                      achievement.rarity === 'epic' ? 'text-purple-400' :
                      achievement.rarity === 'rare' ? 'text-blue-400' :
                      achievement.rarity === 'uncommon' ? 'text-green-400' :
                      'text-gray-400'
                    }`}>
                      <span>{getRarityIcon(achievement.rarity)}</span>
                      <span className="capitalize">{achievement.rarity}</span>
                    </div>
                    
                    <div className="text-lg font-bold text-primary">
                      {achievement.points}pts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <TrophyIcon />
          <h3 className="text-lg font-medium mt-4">No achievements found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
} 