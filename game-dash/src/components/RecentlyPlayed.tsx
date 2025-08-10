
import React from 'react';
import { getRecentlyPlayedGames } from '../lib/steam';

interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
}

const RecentlyPlayedSteam = async () => {
  const games = await getRecentlyPlayedGames();

  return (
    <div className="recently-played-games-steam">
      <h2 className="text-2xl font-bold mb-4">Recently Played on Steam</h2>
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map((game: Game) => (
            <div key={game.appid} className="game-card bg-gray-800 rounded-lg p-4">
              <img
                src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={game.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">{game.name}</h3>
              <p className="text-sm text-gray-400">
                {Math.round(game.playtime_forever / 60)} hours played
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recently played games found.</p>
      )}
    </div>
  );
};

export default RecentlyPlayedSteam;
