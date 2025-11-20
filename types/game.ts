// IGDB API Response Types
export interface IGDBCover {
  id: number;
  url: string;
  image_id: string;
}

export interface IGDBGenre {
  id: number;
  name: string;
}

export interface IGDBPlatform {
  id: number;
  name: string;
  abbreviation?: string;
}

export interface IGDBCompany {
  id: number;
  name: string;
}

export interface IGDBGame {
  id: number;
  name: string;
  cover?: IGDBCover;
  first_release_date?: number; // Unix timestamp
  genres?: IGDBGenre[];
  platforms?: IGDBPlatform[];
  involved_companies?: Array<{
    company: IGDBCompany;
    developer: boolean;
    publisher: boolean;
  }>;
  summary?: string;
  rating?: number;
  rating_count?: number;
}

// Database Types (matching our Supabase schema)
export interface Game {
  id: number; // IGDB ID
  title: string;
  cover_url: string | null;
  release_date: string | null; // ISO date string
  genres: string[] | null;
  platforms: string[] | null;
  developer: string | null;
  publisher: string | null;
  created_at: string;
}

export interface UserGame {
  id: string;
  user_id: string;
  game_id: number;
  platform: string;
  playtime_minutes: number;
  achievements_unlocked: number;
  achievements_total: number;
  status: 'backlog' | 'playing' | 'completed' | 'abandoned';
  last_played_at: string | null;
  added_at: string;
  game?: Game; // Joined from games table
}

export interface LinkedAccount {
  id: string;
  user_id: string;
  platform: 'steam' | 'xbox' | 'playstation' | 'nintendo';
  platform_user_id: string;
  platform_username: string | null;
  last_synced_at: string | null;
  created_at: string;
}

// Helper function to convert IGDB game to our DB format
export function igdbToGame(igdb: IGDBGame): Omit<Game, 'created_at'> {
  const developer = igdb.involved_companies?.find(ic => ic.developer)?.company.name || null;
  const publisher = igdb.involved_companies?.find(ic => ic.publisher)?.company.name || null;

  return {
    id: igdb.id,
    title: igdb.name,
    cover_url: igdb.cover 
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${igdb.cover.image_id}.jpg`
      : null,
    release_date: igdb.first_release_date 
      ? new Date(igdb.first_release_date * 1000).toISOString().split('T')[0]
      : null,
    genres: igdb.genres?.map(g => g.name) || null,
    platforms: igdb.platforms?.map(p => p.name) || null,
    developer,
    publisher,
  };
}
