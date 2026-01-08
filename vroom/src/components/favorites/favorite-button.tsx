//Heart Toggle
'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useFavoritesStore } from '@/stores/use-favorites-store'

interface FavoriteButtonProps {
  id: string
  type: 'driver' | 'team'
  className?: string
  size?: 'sm' | 'default' | 'lg' | 'icon'
}

export function FavoriteButton({ id, type, className, size = 'icon' }: FavoriteButtonProps) {
  const { 
    favoriteDrivers, 
    favoriteTeams, 
    toggleFavoriteDriver, 
    toggleFavoriteTeam 
  } = useFavoritesStore()

  const isFavorite = type === 'driver' 
    ? favoriteDrivers.includes(id) 
    : favoriteTeams.includes(id)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (type === 'driver') {
      toggleFavoriteDriver(id)
    } else {
      toggleFavoriteTeam(id)
    }
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleToggle}
      className={cn(
        'transition-all duration-200 hover:scale-110',
        className
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-colors',
          isFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-muted-foreground hover:text-red-400'
        )}
      />
    </Button>
  )
}