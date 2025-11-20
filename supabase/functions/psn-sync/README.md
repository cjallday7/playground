# PlayStation Network Sync Edge Function

This Edge Function syncs PSN trophy and game data.

## Authentication Challenge

PSN does not have an official public API. Integration requires:

1. User logs into https://my.playstation.com
2. User opens browser DevTools (F12)
3. Navigate to: **Application** → **Cookies** → `https://my.playstation.com`
4. Copy the `npsso` cookie value
5. Paste into the app

## NPSSO Token

- **Format:** Long alphanumeric string
- **Lifespan:** ~60 days (expires, needs refresh)
- **Purpose:** Authenticates API requests to PSN backend

## Implementation Options

### Option 1: psn-api (npm package)
- Wrapper around PSN's unofficial API
- Can exchange NPSSO for access tokens
- Fragile (can break with PSN updates)

### Option 2: Direct API Calls
- Reverse engineer PSN endpoints
- More control but higher maintenance

## Endpoints (Unofficial)

- Trophy data
- Game lists
- Player profiles
- Completion percentages

## Current Status

⚠️ **Not Implemented** - Requires additional research into current PSN API structure.

Users should use **Manual Game Entry** for PlayStation games until this is completed.
