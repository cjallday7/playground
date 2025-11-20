import { supabase } from '../lib/supabase';
import { IGDBGame } from '../types/game';

export async function searchGames(searchTerm: string): Promise<IGDBGame[]> {
  try {
    const query = `
      fields name, cover.image_id, first_release_date, genres.name, platforms.name, 
             involved_companies.company.name, involved_companies.developer, 
             involved_companies.publisher, summary, rating;
      search "${searchTerm}";
      limit 20;
    `;

    const { data, error } = await supabase.functions.invoke('igdb-search', {
      body: { query },
    });

    if (error) throw error;

    return data as IGDBGame[];
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
}

export async function getGameById(gameId: number): Promise<IGDBGame | null> {
  try {
    const query = `
      fields name, cover.image_id, first_release_date, genres.name, platforms.name,
             involved_companies.company.name, involved_companies.developer,
             involved_companies.publisher, summary, rating, rating_count;
      where id = ${gameId};
    `;

    const { data, error } = await supabase.functions.invoke('igdb-search', {
      body: { query },
    });

    if (error) throw error;

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
}
