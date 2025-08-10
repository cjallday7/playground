
export const getRecentlyPlayedGames = async () => {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    throw new Error('Steam API key and Steam ID must be provided.');
  }

  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&count=4`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recently played games.');
  }

  const data = await response.json();
  console.log('Steam API Response:', JSON.stringify(data, null, 2));
  return data.response.games || [];
};
