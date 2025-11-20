# Console API Integration Research

## Xbox Live Integration

### OpenXBL (Recommended Approach)
**Website:** https://xbl.io/

**Authentication:**
- Requires OpenXBL API key (free tier available)
- Simple API key in header, no complex OAuth

**Key Endpoints:**
```
GET https://xbl.io/api/v2/profile
GET https://xbl.io/api/v2/achievements/player/{xuid}
GET https://xbl.io/api/v2/achievements/title/{titleId}
```

**Rate Limits:**
- Free tier: 120 requests/hour
- Paid tier: Unlimited

**Data Available:**
- Gamerscore
- Games library
- Achievement progress
- Playtime (limited)

**How Users Link:**
1. User provides their Xbox Gamertag
2. We fetch their XUID using the gamertag
3. Store XUID for future syncs

---

## PlayStation Network Integration

### psn-api (npm package)
**Package:** `psn-api` on npm

**Authentication:**
- Requires NPSSO token from user's PlayStation account
- Token expires periodically (needs refresh)

**How to Get NPSSO:**
1. User logs into https://my.playstation.com
2. Opens browser DevTools → Application → Cookies
3. Copies the `npsso` cookie value
4. Pastes into app

**Data Available:**
- Trophy data (Bronze, Silver, Gold, Platinum)
- Game titles
- Completion percentage
- Last played timestamps

**Challenges:**
- NPSSO token management (expires)
- No official API (relies on reverse engineering)
- Can break with PSN updates

---

## Nintendo Switch

### Status: NO PUBLIC API

**Recommendation:**
- Manual entry only
- User searches game via IGDB
- User manually inputs playtime (estimated)
- No achievement tracking (Switch doesn't have achievements)

**UI Approach:**
- Simple "Add Nintendo Game" button
- Search IGDB for game title
- User enters playtime manually
- Platform auto-set to "Nintendo Switch"

---

## Implementation Priority

1. **Xbox (OpenXBL)** - Most reliable, has free tier
2. **Manual Nintendo Entry** - Simple to implement
3. **PlayStation (psn-api)** - Fragile, requires user to extract cookies
