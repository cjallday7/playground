
export const getRecentlyPlayedGames = async () => {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  console.log('API Key exists:', !!apiKey);
  console.log('Steam ID exists:', !!steamId);
  console.log('Steam ID length:', steamId?.length);

  if (!apiKey || !steamId) {
    throw new Error('Steam API key and Steam ID must be provided.');
  }

  // Test with GetPlayerSummaries first to verify API access
  const testResponse = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
  );
  const testData = await testResponse.json();
  console.log('Player Summary Response:', JSON.stringify(testData, null, 2));

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
