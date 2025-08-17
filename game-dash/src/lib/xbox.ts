export interface XboxGame {
  titleId: string;
  name: string;
  devices: string[];
  displayImage: string;
  modernTitleId: string;
  isBundle: boolean;
  achievement: {
    currentAchievements: number;
    totalAchievements: number;
  };
  stats: {
    [key: string]: {
      value: string;
    };
  };
}

export interface XboxActivityItem {
  sessionId: string;
  startTime: string;
  endTime: string;
  titleId: string;
  titleName: string;
  titleImage: string;
  platform: string;
}

export const getRecentlyPlayedXboxGames = async (): Promise<XboxGame[]> => {
  const apiKey = process.env.OPENXBL_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenXBL API key must be provided.');
  }

  try {
    // First get the account info to get XUID
    const accountResponse = await fetch('https://xbl.io/api/v2/account', {
      headers: {
        'X-Authorization': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!accountResponse.ok) {
      throw new Error(`Failed to fetch account info: ${accountResponse.status}`);
    }

    const accountData = await accountResponse.json();
    const xuid = accountData.xuid;

    // Get recent activity
    const activityResponse = await fetch(`https://xbl.io/api/v2/xuid/${xuid}/activity/recent`, {
      headers: {
        'X-Authorization': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!activityResponse.ok) {
      throw new Error(`Failed to fetch recent activity: ${activityResponse.status}`);
    }

    const activityData = await activityResponse.json();
    
    // Extract unique games from recent activity (last 4)
    const uniqueGames = new Map<string, XboxActivityItem>();
    
    if (activityData.activityItems) {
      activityData.activityItems.forEach((item: XboxActivityItem) => {
        if (!uniqueGames.has(item.titleId)) {
          uniqueGames.set(item.titleId, item);
        }
      });
    }

    // Get the first 4 unique games
    const recentGames = Array.from(uniqueGames.values()).slice(0, 4);

    // For each game, try to get additional stats including playtime
    const gamesWithStats = await Promise.all(
      recentGames.map(async (game) => {
        try {
          const statsResponse = await fetch(`https://xbl.io/api/v2/xuid/${xuid}/title/${game.titleId}/stats`, {
            headers: {
              'X-Authorization': apiKey,
              'Accept': 'application/json',
            },
          });

          let stats = {};
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            stats = statsData.stats || {};
          }

          return {
            titleId: game.titleId,
            name: game.titleName,
            devices: [game.platform],
            displayImage: game.titleImage,
            modernTitleId: game.titleId,
            isBundle: false,
            achievement: {
              currentAchievements: 0,
              totalAchievements: 0,
            },
            stats: stats,
          };
        } catch (error) {
          console.error(`Error fetching stats for ${game.titleName}:`, error);
          return {
            titleId: game.titleId,
            name: game.titleName,
            devices: [game.platform],
            displayImage: game.titleImage,
            modernTitleId: game.titleId,
            isBundle: false,
            achievement: {
              currentAchievements: 0,
              totalAchievements: 0,
            },
            stats: {},
          };
        }
      })
    );

    return gamesWithStats;
  } catch (error) {
    console.error('Error fetching Xbox games:', error);
    return [];
  }
};

export const formatPlaytime = (stats: { [key: string]: { value: string } }): string => {
  // Try to find playtime in various possible stat names
  const playtimeKeys = ['TotalTimePlayed', 'TimePlayed', 'PlayTime', 'GameTime'];
  
  for (const key of playtimeKeys) {
    if (stats[key]) {
      const value = stats[key].value;
      // If it's in seconds, convert to hours
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        if (numValue > 3600) {
          // Assume it's in seconds if large number
          return `${Math.round(numValue / 3600)} hours`;
        } else {
          // Assume it's already in hours if smaller
          return `${Math.round(numValue)} hours`;
        }
      }
    }
  }
  
  return 'Playtime unavailable';
};
