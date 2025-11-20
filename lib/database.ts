import { supabase } from './supabase';

export async function syncSteamLibrary(steamId: string) {
  const { data, error } = await supabase.functions.invoke('steam-sync', {
    body: { steamId },
  });

  if (error) throw error;
  return data;
}

export async function getUserGames() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('user_games')
    .select(`
      *,
      game:games (*)
    `)
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getLinkedAccounts() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('linked_accounts')
    .select('*')
    .eq('user_id', user.id);

  if (error) throw error;
  return data;
}

export async function updateGameStatus(
  userGameId: string,
  status: 'backlog' | 'playing' | 'completed' | 'abandoned'
) {
  const { error } = await supabase
    .from('user_games')
    .update({ status })
    .eq('id', userGameId);

  if (error) throw error;
}
