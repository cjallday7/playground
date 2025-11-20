# IGDB Search Edge Function

This Edge Function acts as a proxy to the IGDB API, handling authentication with Twitch and caching access tokens.

## Deployment

1. Go to your Supabase Dashboard: https://asbfjyriobiieqyldukf.supabase.co
2. Navigate to **Edge Functions** in the sidebar
3. Click **Create a new function**
4. Name it: `igdb-search`
5. Copy the contents of `index.ts` and paste it into the editor
6. Click **Deploy**

## Usage from the app

```typescript
const response = await supabase.functions.invoke('igdb-search', {
  body: {
    query: 'fields name, cover.url, first_release_date; search "Halo";'
  }
})
```

## IGDB Query Language

Examples:
- Search: `fields name, cover.url; search "God of War"; limit 10;`
- Get by ID: `fields name, cover.url, genres.name; where id = 1942;`
- Popular games: `fields name, rating; where rating > 90; sort rating desc; limit 20;`
