import React from 'react';
import { getRecentlyPlayedXboxGames, formatPlaytime, XboxGame } from '../lib/xbox';

const RecentlyPlayedXbox = async () => {
  const games = await getRecentlyPlayedXboxGames();

  return (
    <div className="recently-played-games-xbox" style={{ marginBottom: '2rem' }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
        Recently Played on Xbox
      </h2>
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game: XboxGame) => (
            <div 
              key={game.titleId} 
              className="game-card rounded-lg p-4 transition-transform hover:scale-105"
              style={{ 
                backgroundColor: 'color-mix(in srgb, var(--background) 90%, #333)', 
                border: '1px solid color-mix(in srgb, var(--foreground) 20%, transparent)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <img
                src={game.displayImage}
                alt={game.name}
                className="w-full h-32 object-cover rounded-md mb-4"
                style={{ backgroundColor: 'color-mix(in srgb, var(--background) 80%, #666)' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-game.png'; // Fallback image
                }}
              />
              <h3 
                className="text-lg font-bold mb-2" 
                style={{ color: 'var(--foreground)', fontFamily: 'var(--font-sans)' }}
              >
                {game.name}
              </h3>
              <p 
                className="text-sm mb-1" 
                style={{ color: 'color-mix(in srgb, var(--foreground) 70%, transparent)' }}
              >
                {formatPlaytime(game.stats)}
              </p>
              {game.devices && game.devices.length > 0 && (
                <p 
                  className="text-xs" 
                  style={{ color: 'color-mix(in srgb, var(--foreground) 60%, #10b981)' }}
                >
                  Platform: {game.devices.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'color-mix(in srgb, var(--foreground) 60%, transparent)' }}>
          No recently played games found.
        </p>
      )}
    </div>
  );
};

export default RecentlyPlayedXbox;
