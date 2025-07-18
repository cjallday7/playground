"use client"

// Using placeholder icons as substitutes for lucide-react
const PlayIcon = () => <span>▶</span>
const TrophyIcon = () => <span>🏆</span>
const ClockIcon = () => <span>⏰</span>
const GamepadIcon = () => <span>🎮</span>
const TrendingUpIcon = () => <span>📈</span>
const StarIcon = () => <span>⭐</span>

export function Dashboard() {
  // Mock data - in a real app, this would come from your API/state management
  const stats = {
    totalGames: 147,
    totalAchievements: 2834,
    totalPlaytime: "1,247h",
    completionRate: 73,
    recentlyPlayed: [
      { 
        id: 1, 
        name: "Elden Ring", 
        platform: "Steam", 
        lastPlayed: "2h ago", 
        progress: 68,
        image: "/api/placeholder/60/60"
      },
      { 
        id: 2, 
        name: "Spider-Man 2", 
        platform: "PlayStation", 
        lastPlayed: "1d ago", 
        progress: 94,
        image: "/api/placeholder/60/60"
      },
      { 
        id: 3, 
        name: "Forza Horizon 5", 
        platform: "Xbox", 
        lastPlayed: "3d ago", 
        progress: 45,
        image: "/api/placeholder/60/60"
      }
    ],
    recentAchievements: [
      {
        id: 1,
        name: "Dragon Slayer",
        game: "Elden Ring",
        rarity: "epic",
        unlockedAt: "2h ago",
        icon: "/api/placeholder/40/40"
      },
      {
        id: 2,
        name: "Web Warrior",
        game: "Spider-Man 2",
        rarity: "rare",
        unlockedAt: "1d ago",
        icon: "/api/placeholder/40/40"
      },
      {
        id: 3,
        name: "Speed Demon",
        game: "Forza Horizon 5",
        rarity: "uncommon",
        unlockedAt: "3d ago",
        icon: "/api/placeholder/40/40"
      }
    ]
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Welcome back, Gamer!
        </h1>
        <p className="text-muted-foreground">Track your gaming journey across all platforms</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GamepadIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalGames}</p>
              <p className="text-sm text-muted-foreground">Games</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <TrophyIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalAchievements}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ClockIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalPlaytime}</p>
              <p className="text-sm text-muted-foreground">Playtime</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUpIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completionRate}%</p>
              <p className="text-sm text-muted-foreground">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Played Games */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <PlayIcon />
          <span>Recently Played</span>
        </h2>
        <div className="space-y-4">
          {stats.recentlyPlayed.map((game) => (
            <div key={game.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <GamepadIcon />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{game.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{game.platform}</span>
                  <span>•</span>
                  <span>{game.lastPlayed}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{game.progress}%</p>
                <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${game.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <TrophyIcon />
          <span>Recent Achievements</span>
        </h2>
        <div className="space-y-4">
          {stats.recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <StarIcon />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{achievement.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{achievement.game}</span>
                  <span>•</span>
                  <span className={`rarity-${achievement.rarity} font-medium`}>
                    {achievement.rarity}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.unlockedAt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 