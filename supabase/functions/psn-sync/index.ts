import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// PSN integration using NPSSO token from user
// User must extract their NPSSO token from PlayStation.com cookies

interface PSNGame {
  titleId: string
  name: string
  trophyTitles?: {
    bronze: number
    silver: number
    gold: number
    platinum: number
  }
  progress: number
  lastPlayedDateTime?: string
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
    const { npssoToken } = await req.json()

    if (!npssoToken) {
      return new Response(JSON.stringify({ 
        error: 'NPSSO token is required',
        instructions: 'Visit https://my.playstation.com, open DevTools > Application > Cookies, and copy the "npsso" value'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // TODO: Implement psn-api integration
    // This requires installing psn-api package in Deno environment
    // For now, return placeholder response

    return new Response(JSON.stringify({
      error: 'PSN integration not yet implemented',
      message: 'Coming soon! Use manual game entry for PlayStation games.',
      games: [],
    }), {
      status: 501,
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
