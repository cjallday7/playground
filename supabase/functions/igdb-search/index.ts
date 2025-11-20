import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const TWITCH_CLIENT_ID = 'aau1ggzkdkr5os4j0nhvn40h78u37v'
const TWITCH_CLIENT_SECRET = 'quuw1d50o2blfukj81rfn8mmottf35'

interface TwitchAuthResponse {
  access_token: string
  expires_in: number
  token_type: string
}

// Cache the access token in memory (Deno Deploy will persist this across requests)
let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getTwitchToken(): Promise<string> {
  const now = Date.now()
  
  // Return cached token if still valid
  if (cachedToken && now < tokenExpiry) {
    return cachedToken
  }

  // Fetch new token
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  const data: TwitchAuthResponse = await response.json()
  cachedToken = data.access_token
  tokenExpiry = now + (data.expires_in * 1000) - 60000 // Refresh 1 minute early

  return cachedToken
}

serve(async (req) => {
  // Handle CORS preflight
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
    const { query, fields } = await req.json()

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get Twitch access token
    const token = await getTwitchToken()

    // Query IGDB
    const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    })

    const games = await igdbResponse.json()

    return new Response(JSON.stringify(games), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
