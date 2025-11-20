import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const STEAM_API_KEY = '84E595B02B5EDCD598B5AE7FC9955AD2'
const TWITCH_CLIENT_ID = 'aau1ggzkdkr5os4j0nhvn40h78u37v'
const TWITCH_CLIENT_SECRET = 'quuw1d50o2blfukj81rfn8mmottf35'

interface SteamGame {
  appid: number
  name: string
  playtime_forever: number
  playtime_2weeks?: number
  img_icon_url?: string
  img_logo_url?: string
}

interface SteamLibraryResponse {
  response: {
    game_count: number
    games: SteamGame[]
  }
}

interface IGDBExternalGame {
  game: number
  uid: string
}

// Cache for Twitch token
let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getTwitchToken(): Promise<string> {
  const now = Date.now()
  
  if (cachedToken && now < tokenExpiry) {
    return cachedToken
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  const data = await response.json()
  cachedToken = data.access_token
  tokenExpiry = now + (data.expires_in * 1000) - 60000

  return cachedToken
}

async function getSteamLibrary(steamId: string): Promise<SteamGame[]> {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
  
  const response = await fetch(url)
  const data: SteamLibraryResponse = await response.json()
  
  return data.response.games || []
}

async function mapSteamToIGDB(steamAppId: number): Promise<number | null> {
  const token = await getTwitchToken()
  
  const query = `fields game, uid; where uid = "${steamAppId}";`
  
  const response = await fetch('https://api.igdb.com/v4/external_games', {
    method: 'POST',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body: query,
  })

  const externalGames: IGDBExternalGame[] = await response.json()
  
  return externalGames.length > 0 ? externalGames[0].game : null
}

async function getIGDBGameDetails(gameIds: number[]) {
  const token = await getTwitchToken()
  
  const query = `fields id, name, cover.image_id, first_release_date, genres.name, platforms.name; where id = (${gameIds.join(',')}); limit 500;`
  
  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
    body: query,
  })

  return await response.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const { steamId } = await req.json()

    if (!steamId) {
      return new Response(JSON.stringify({ error: 'Steam ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch Steam library
    const steamGames = await getSteamLibrary(steamId)

    // Map Steam AppIDs to IGDB IDs (batch process to avoid rate limits)
    const mappedGames = []
    
    for (let i = 0; i < steamGames.length; i += 10) {
      const batch = steamGames.slice(i, i + 10)
      
      const mappingPromises = batch.map(async (game) => {
        const igdbId = await mapSteamToIGDB(game.appid)
        return {
          steamAppId: game.appid,
          steamName: game.name,
          playtimeMinutes: game.playtime_forever,
          igdbId,
        }
      })

      const batchResults = await Promise.all(mappingPromises)
      mappedGames.push(...batchResults)
      
      // Rate limit: wait 250ms between batches (4 req/sec for IGDB)
      if (i + 10 < steamGames.length) {
        await new Promise(resolve => setTimeout(resolve, 250))
      }
    }

    // Fetch IGDB details for successfully mapped games
    const validIgdbIds = mappedGames
      .filter(g => g.igdbId !== null)
      .map(g => g.igdbId!)

    let igdbGames = []
    if (validIgdbIds.length > 0) {
      igdbGames = await getIGDBGameDetails(validIgdbIds)
    }

    return new Response(JSON.stringify({
      steamGames: mappedGames,
      igdbGames,
      totalGames: steamGames.length,
      mappedGames: validIgdbIds.length,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})
