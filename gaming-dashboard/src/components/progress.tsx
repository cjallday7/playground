"use client"

import { useState } from "react"

// Placeholder icons
const ClockIcon = () => <span>⏰</span>
const TrendingUpIcon = () => <span>📈</span>
const TargetIcon = () => <span>🎯</span>
const CalendarIcon = () => <span>📅</span>
const GamepadIcon = () => <span>🎮</span>

export function Progress() {
  const [timeframe, setTimeframe] = useState("week")
  const [selectedGame, setSelectedGame] = useState("all")

  // Mock data
  const playtimeStats = {
    today: 3.2,
    thisWeek: 18.5,
    thisMonth: 76.3,
    total: 1247.8
  }

  const progressData = [
    {
      id: 1,
      name: "Elden Ring",
      platform: "Steam",
      progress: 68,
      hoursPlayed: 126,
      sessionsThisWeek: 8,
      lastSession: "2h ago",
      milestones: [
        { name: "First Boss Defeated", completed: true },
        { name: "Reach Level 50", completed: true },
        { name: "Explore All Regions", completed: false, progress: 75 },
        { name: "Collect All Weapons", completed: false, progress: 45 }
      ]
    },
    {
      id: 2,
      name: "Spider-Man 2",
      platform: "PlayStation",
      progress: 94,
      hoursPlayed: 87,
      sessionsThisWeek: 5,
      lastSession: "1d ago",
      milestones: [
        { name: "Complete Main Story", completed: true },
        { name: "All Side Missions", completed: true },
        { name: "Collect All Suits", completed: false, progress: 90 },
        { name: "100% Borough Completion", completed: false, progress: 85 }
      ]
    },
    {
      id: 3,
      name: "Forza Horizon 5",
      platform: "Xbox",
      progress: 45,
      hoursPlayed: 203,
      sessionsThisWeek: 12,
      lastSession: "3d ago",
      milestones: [
        { name: "Complete Tutorial", completed: true },
        { name: "Win 50 Races", completed: true },
        { name: "Unlock All Festivals", completed: false, progress: 60 },
        { name: "Master Driver Level", completed: false, progress: 30 }
      ]
    }
  ]

  const weeklyData = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 4.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 3.1 },
    { day: "Fri", hours: 5.3 },
    { day: "Sat", hours: 1.2 },
    { day: "Sun", hours: 0.4 }
  ]

  const maxHours = Math.max(...weeklyData.map(d => d.hours))

  const formatPlaytime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}m`
    return `${hours.toFixed(1)}h`
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Progress Tracking</h1>
        <p className="text-muted-foreground">Detailed insights into your gaming journey</p>
      </div>

      {/* Playtime Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ClockIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatPlaytime(playtimeStats.today)}</p>
              <p className="text-sm text-muted-foreground">Today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUpIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatPlaytime(playtimeStats.thisWeek)}</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CalendarIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatPlaytime(playtimeStats.thisMonth)}</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <GamepadIcon />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatPlaytime(playtimeStats.total)}</p>
              <p className="text-sm text-muted-foreground">All Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4 h-40">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col justify-end h-32">
                  <div 
                    className="w-8 bg-primary rounded-t-lg transition-all duration-300 hover:bg-primary/80"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <span className="text-xs font-medium">{formatPlaytime(day.hours)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Progress Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Game Progress</h2>
        
        {progressData.map((game) => (
          <div key={game.id} className="bg-card rounded-xl p-6 border border-border/50 hover:border-border transition-colors">
            <div className="space-y-4">
              {/* Game Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <GamepadIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{game.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{game.platform}</span>
                      <span>•</span>
                      <span>{formatPlaytime(game.hoursPlayed)} played</span>
                      <span>•</span>
                      <span>{game.sessionsThisWeek} sessions this week</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{game.progress}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{game.progress}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${game.progress}%` }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center space-x-2">
                  <TargetIcon />
                  <span>Milestones</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {game.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        milestone.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-secondary border-2 border-primary text-primary'
                      }`}>
                        {milestone.completed ? '✓' : '○'}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          milestone.completed ? 'text-muted-foreground line-through' : ''
                        }`}>
                          {milestone.name}
                        </p>
                        
                        {!milestone.completed && milestone.progress && (
                          <div className="mt-1">
                            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{milestone.progress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 