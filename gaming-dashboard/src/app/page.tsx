"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Dashboard } from "@/components/dashboard"
import { GameLibrary } from "@/components/game-library"
import { Achievements } from "@/components/achievements"
import { Progress } from "@/components/progress"
import { Profile } from "@/components/profile"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "library":
        return <GameLibrary />
      case "achievements":
        return <Achievements />
      case "progress":
        return <Progress />
      case "profile":
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-0 pb-24 px-4 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
