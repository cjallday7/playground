"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

// Placeholder icons using emojis
const HomeIcon = () => <span>🏠</span>
const GamepadIcon = () => <span>🎮</span>
const TrophyIcon = () => <span>🏆</span>
const ClockIcon = () => <span>⏰</span>
const UserIcon = () => <span>👤</span>
const SearchIcon = () => <span>🔍</span>
const BellIcon = () => <span>🔔</span>
const SettingsIcon = () => <span>⚙️</span>

const tabs = [
  { id: "dashboard", label: "Home", icon: HomeIcon },
  { id: "library", label: "Library", icon: GamepadIcon },
  { id: "achievements", label: "Trophies", icon: TrophyIcon },
  { id: "progress", label: "Progress", icon: ClockIcon },
  { id: "profile", label: "Profile", icon: UserIcon },
]

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <GamepadIcon />
            </div>
            <div>
              <h1 className="text-lg font-bold">GameTracker</h1>
              <p className="text-xs text-muted-foreground -mt-1">Pro</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-secondary/80 transition-colors">
              <SearchIcon />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary/80 transition-colors relative">
              <BellIcon />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary/80 transition-colors">
              <SettingsIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200",
                "min-w-[60px] relative",
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-primary/10 rounded-xl animate-fade-in" />
              )}
              <div className="relative z-10">
                <tab.icon />
              </div>
              <span className="text-xs font-medium relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
} 