# Xbox Sync Edge Function

This Edge Function syncs Xbox Live game data using the OpenXBL API.

## Setup

1. Get an API key from https://xbl.io/
2. Replace `YOUR_OPENXBL_API_KEY` in the code with your actual key
3. Deploy to Supabase Edge Functions

## OpenXBL API Documentation

- **Website:** https://xbl.io/
- **Docs:** https://xbl.io/docs
- **Free Tier:** 120 requests/hour

## Endpoints Used

- `GET /api/v2/friends/search?gt={gamertag}` - Get XUID from gamertag
- `GET /api/v2/achievements/player/{xuid}` - Get player's game achievements

## Usage

```typescript
const { data, error } = await supabase.functions.invoke('xbox-sync', {
  body: { gamertag: 'PlayerGamertag' }
})
```

## Response

```json
{
  "profile": {
    "gamertag": "PlayerGamertag",
    "xuid": "2533274792345678",
    "gamerscore": 12500
  },
  "games": [
    {
      "titleId": "123456789",
      "name": "Halo Infinite",
      "earnedAchievements": 25,
      "totalAchievements": 50,
      "currentGamerscore": 500,
      "maxGamerscore": 1000
    }
  ],
  "totalGames": 150
}
```
