"use client"

import { useState } from "react"

// Placeholder icons
const UserIcon = () => <span>👤</span>
const SettingsIcon = () => <span>⚙️</span>
const LinkIcon = () => <span>🔗</span>
const FriendsIcon = () => <span>👥</span>
const ShieldIcon = () => <span>🛡️</span>
const BellIcon = () => <span>🔔</span>
const TrophyIcon = () => <span>🏆</span>
const GamepadIcon = () => <span>🎮</span>
const ClockIcon = () => <span>⏰</span>
const CalendarIcon = () => <span>📅</span>

export function Profile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)

  // Mock data
  const userProfile = {
    username: "GamerPro2024",
    joinDate: "March 2023",
    avatar: "/api/placeholder/80/80",
    level: 42,
    experience: 8750,
    nextLevelExp: 10000,
    totalGames: 147,
    totalAchievements: 2834,
    totalHours: 1247,
    completionRate: 73
  }

  const connectedPlatforms = [
    { id: "steam", name: "Steam", username: "GamerPro2024", connected: true, color: "#00adee" },
    { id: "xbox", name: "Xbox Live", username: "GamerPro2024", connected: true, color: "#9acd32" },
    { id: "playstation", name: "PlayStation", username: "GamerPro2024", connected: true, color: "#0070d1" },
    { id: "nintendo", name: "Nintendo", username: "GamerPro24", connected: true, color: "#e60012" },
    { id: "epic", name: "Epic Games", username: "", connected: false, color: "#313131" },
    { id: "gog", name: "GOG", username: "", connected: false, color: "#8b5fbf" },
  ]

  const friends = [
    { id: 1, username: "SpeedRunner99", status: "online", lastSeen: "Now", mutualGames: 23 },
    { id: 2, username: "AchievementHunter", status: "away", lastSeen: "5m ago", mutualGames: 18 },
    { id: 3, username: "CasualGamer", status: "offline", lastSeen: "2h ago", mutualGames: 12 },
    { id: 4, username: "ProPlayer", status: "playing", lastSeen: "Playing Elden Ring", mutualGames: 31 }
  ]

  const recentActivity = [
    { type: "achievement", text: "Unlocked 'Dragon Slayer' in Elden Ring", time: "2h ago" },
    { type: "milestone", text: "Reached 100 hours in Spider-Man 2", time: "1d ago" },
    { type: "friend", text: "SpeedRunner99 started following you", time: "2d ago" },
    { type: "completion", text: "Completed God of War Ragnarök (88%)", time: "3d ago" }
  ]

  const formatExperience = () => {
    const progress = (userProfile.experience / userProfile.nextLevelExp) * 100
    return progress
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "playing": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <UserIcon />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{userProfile.username}</h2>
            <p className="text-muted-foreground">Member since {userProfile.joinDate}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Level {userProfile.level}</span>
                <span>{userProfile.experience}/{userProfile.nextLevelExp} XP</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${formatExperience()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
          <GamepadIcon />
          <p className="text-2xl font-bold mt-2">{userProfile.totalGames}</p>
          <p className="text-sm text-muted-foreground">Games</p>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
          <TrophyIcon />
          <p className="text-2xl font-bold mt-2">{userProfile.totalAchievements}</p>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
          <ClockIcon />
          <p className="text-2xl font-bold mt-2">{userProfile.totalHours}h</p>
          <p className="text-sm text-muted-foreground">Playtime</p>
        </div>
        
        <div className="bg-card rounded-xl p-4 border border-border/50 text-center">
          <span>📊</span>
          <p className="text-2xl font-bold mt-2">{userProfile.completionRate}%</p>
          <p className="text-sm text-muted-foreground">Completion</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl p-6 border border-border/50">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPlatforms = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Connected Platforms</h2>
        <p className="text-muted-foreground mt-2">Manage your gaming platform connections</p>
      </div>

      <div className="grid gap-4">
        {connectedPlatforms.map((platform) => (
          <div key={platform.id} className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: platform.color + '20' }}
                >
                  <span style={{ color: platform.color }}>🎮</span>
                </div>
                
                <div>
                  <h3 className="font-medium">{platform.name}</h3>
                  {platform.connected ? (
                    <p className="text-sm text-muted-foreground">{platform.username}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  )}
                </div>
              </div>
              
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  platform.connected
                    ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {platform.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFriends = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Friends</h2>
        <p className="text-muted-foreground mt-2">Connect and compare with other gamers</p>
      </div>

      <div className="grid gap-4">
        {friends.map((friend) => (
          <div key={friend.id} className="bg-card rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <UserIcon />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-background`}></div>
                </div>
                
                <div>
                  <h3 className="font-medium">{friend.username}</h3>
                  <p className="text-sm text-muted-foreground">{friend.lastSeen}</p>
                  <p className="text-xs text-muted-foreground">{friend.mutualGames} mutual games</p>
                </div>
              </div>
              
              <button className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Settings</h2>
        <p className="text-muted-foreground mt-2">Customize your gaming experience</p>
      </div>

      <div className="space-y-4">
        {/* Privacy Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <ShieldIcon />
            <span>Privacy</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">Allow others to view your gaming stats</p>
              </div>
              <button
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  publicProfile ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  publicProfile ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <BellIcon />
            <span>Notifications</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified about achievements and milestones</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>🎨</span>
            <span>Appearance</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme for better night gaming</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "platforms", label: "Platforms" },
    { id: "friends", label: "Friends" },
    { id: "settings", label: "Settings" }
  ]

  return (
    <div className="space-y-6 pt-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-secondary/50 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "platforms" && renderPlatforms()}
        {activeTab === "friends" && renderFriends()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  )
} 