# Game Tracker App

A cross-platform mobile app for tracking your video game library, achievements, and playtime across all major gaming platforms (Steam, Xbox, PlayStation, Nintendo Switch).

Inspired by [Exophase](https://www.exophase.com/), this app provides a unified hub for all your gaming data.

## Features

### ✅ Implemented
- **Multi-Platform Authentication:** Email/Password and Google OAuth via Supabase
- **IGDB Integration:** Rich game metadata (cover art, genres, platforms, release dates)
- **Steam Sync:** Automatic library sync via Steam Web API
- **Manual Game Entry:** Add games from any platform manually
- **Game Library View:** Grid display with cover art, playtime, and status badges
- **Platform Linking:** UI for connecting Steam, Xbox, PlayStation, and Nintendo accounts
- **Game Detail Modal:** Full game details with edit capabilities
- **Library Filters:** Filter by platform, status, and genre; sort by recent, A-Z, or playtime
- **Search Functionality:** Real-time search across your game library
- **Statistics Dashboard:** Total playtime, completion %, platform breakdown, top genres, most played games
- **Quick Edit:** Update game status and playtime directly from detail view

### 🚧 In Progress
- **Xbox Integration:** Via OpenXBL API (requires API key)
- **PlayStation Integration:** Via NPSSO token extraction (complex authentication)

### 📋 Planned
- Social features (friends, leaderboards)
- Game recommendations based on library

## Tech Stack

### Frontend
- **React Native** with **Expo** (managed workflow)
- **React Navigation** for tab-based navigation
- **TanStack Query** (React Query) for data fetching and caching
- **TypeScript** for type safety

### Backend
- **Supabase:**
  - PostgreSQL database
  - Row-Level Security (RLS)
  - Edge Functions (Deno runtime)
  - Authentication (Email + Google OAuth)

### APIs
- **IGDB** (via Twitch) - Game metadata
- **Steam Web API** - Steam library and achievements
- **OpenXBL** - Xbox Live data (optional, requires API key)
- **PSN API** - PlayStation trophies (unofficial, complex setup)

## Project Structure

```
backlog/
├── components/          # React Native UI components
│   ├── Auth.tsx        # Sign in/sign up screens
│   ├── GameLibrary.tsx # Main library grid view
│   ├── GameSearch.tsx  # IGDB game search
│   ├── SteamSync.tsx   # Steam account linking
│   ├── ManualGameEntry.tsx # Manual game addition
│   └── LinkAccounts.tsx    # Platform linking hub
├── lib/                # Helper functions
│   ├── supabase.ts     # Supabase client config
│   ├── igdb.ts         # IGDB API wrapper
│   └── database.ts     # Database query helpers
├── types/              # TypeScript type definitions
│   └── game.ts         # Game, UserGame, IGDBGame types
├── supabase/
│   ├── schema.sql      # Database schema
│   └── functions/      # Edge Functions
│       ├── igdb-search/
│       ├── steam-sync/
│       ├── xbox-sync/  # (placeholder)
│       └── psn-sync/   # (placeholder)
└── docs/               # Documentation
    └── console-api-research.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Expo Go app on your phone (for testing)
- Supabase account
- Twitch Developer account (for IGDB)
- Steam Web API key
- (Optional) OpenXBL API key

### 1. Clone and Install
```bash
cd backlog
npm install
```

### 2. Configure Supabase
1. Create a project at https://supabase.com
2. Go to **Settings** → **API** and copy:
   - Project URL
   - anon public key
3. Update `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Database Migrations
1. Go to Supabase dashboard → **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Execute the SQL

### 4. Deploy Edge Functions
For each function in `supabase/functions/`:
1. Go to **Edge Functions** → **Create a new function**
2. Copy the `index.ts` content
3. Deploy

**Required functions:**
- `igdb-search`
- `steam-sync`

### 5. Get API Keys

#### IGDB (Required)
1. Create a Twitch app: https://dev.twitch.tv/console
2. Copy Client ID and Secret
3. Update `supabase/functions/igdb-search/index.ts` with your credentials

#### Steam (Required)
1. Get key: https://steamcommunity.com/dev/apikey
2. Update `supabase/functions/steam-sync/index.ts` with your key

#### OpenXBL (Optional)
1. Sign up: https://xbl.io/
2. Get API key from dashboard
3. Update `supabase/functions/xbox-sync/index.ts`

### 6. Enable Google OAuth (Optional)
1. Supabase dashboard → **Authentication** → **Providers**
2. Enable Google
3. Configure Google Cloud Console OAuth credentials
4. Add authorized redirect URIs

### 7. Run the App
```bash
npm start
```
Scan the QR code with Expo Go to test on your phone.

## Database Schema

### `profiles`
User profiles (auto-created on signup)

### `linked_accounts`
Platform connections (Steam ID, Xbox Gamertag, etc.)

### `games`
Game metadata cache from IGDB

### `user_games`
User's owned games with playtime and achievement data

## API Rate Limits

- **IGDB:** 4 requests/second
- **Steam:** No official limit (use reasonable throttling)
- **OpenXBL Free Tier:** 120 requests/hour

## Known Limitations

1. **Steam:**
   - Requires public profile
   - Limited playtime data for some games

2. **Xbox:**
   - Requires OpenXBL API key (free tier has limits)
   - Some game data may be incomplete

3. **PlayStation:**
   - Requires manual NPSSO token extraction
   - Token expires periodically
   - Unofficial API (can break)

4. **Nintendo:**
   - No API available
   - Manual entry only

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

MIT

## Acknowledgments

- Game data provided by [IGDB](https://www.igdb.com/)
- Inspired by [Exophase](https://www.exophase.com/)
- Xbox data via [OpenXBL](https://xbl.io/)
