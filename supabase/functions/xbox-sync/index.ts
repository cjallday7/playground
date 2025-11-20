import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// TODO: Get API key from https://xbl.io/
const OPENXBL_API_KEY = 'YOUR_OPENXBL_API_KEY'

interface XboxProfile {
  gamertag: string
  xuid: string
  gamerscore: number
}

interface XboxGame {
  titleId: string
  name: string
  earnedAchievements: number
  totalAchievements: number
  currentGamerscore: number
  maxGamerscore: number
}

async function getXboxProfile(gamertag: string): Promise<XboxProfile> {
  const response = await fetch(`https://xbl.io/api/v2/friends/search?gt=${gamertag}`, {
    headers: {
      'X-Authorization': OPENXBL_API_KEY,
      'Accept': 'application/json',
    },
  })

  const data = await response.json()
  
  if (!data.people || data.people.length === 0) {
    throw new Error('Gamertag not found')
  }

  return {
    gamertag: data.people[0].gamertag,
    xuid: data.people[0].xuid,
    gamerscore: data.people[0].gamerScore,
  }
}

async function getXboxGames(xuid: string): Promise<XboxGame[]> {
  const response = await fetch(`https://xbl.io/api/v2/achievements/player/${xuid}`, {
    headers: {
      'X-Authorization': OPENXBL_API_KEY,
      'Accept': 'application/json',
    },
  })

  const data = await response.json()
  return data.titles || []
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
    const { gamertag } = await req.json()

    if (!gamertag) {
      return new Response(JSON.stringify({ error: 'Gamertag is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get Xbox profile
    const profile = await getXboxProfile(gamertag)

    // Get games list
    const games = await getXboxGames(profile.xuid)

    return new Response(JSON.stringify({
      profile,
      games,
      totalGames: games.length,
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
