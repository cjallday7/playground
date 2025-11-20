import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { igdbToGame } from '../types/game';

interface SteamSyncProps {
  onSyncComplete?: () => void;
}

export default function SteamSync({ onSyncComplete }: SteamSyncProps) {
  const [steamId, setSteamId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState('');

  const linkSteamAccount = async () => {
    if (!steamId.trim()) {
      Alert.alert('Error', 'Please enter your Steam ID');
      return;
    }

    setIsSyncing(true);
    setSyncProgress('Fetching Steam library...');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Call Edge Function to sync Steam library
      const { data, error } = await supabase.functions.invoke('steam-sync', {
        body: { steamId },
      });

      if (error) throw error;

      setSyncProgress(`Found ${data.totalGames} games, mapped ${data.mappedGames} to IGDB...`);

      // Store linked account
      const { error: linkError } = await supabase
        .from('linked_accounts')
        .upsert({
          user_id: user.id,
          platform: 'steam',
          platform_user_id: steamId,
          last_synced_at: new Date().toISOString(),
        }, { onConflict: 'user_id,platform' });

      if (linkError) throw linkError;

      setSyncProgress('Saving games to library...');

      // Save IGDB games to database
      if (data.igdbGames && data.igdbGames.length > 0) {
        const gamesData = data.igdbGames.map((igdbGame: any) => igdbToGame(igdbGame));
        
        const { error: gamesError } = await supabase
          .from('games')
          .upsert(gamesData, { onConflict: 'id' });

        if (gamesError) throw gamesError;
      }

      // Create user_games entries
      const userGamesData = data.steamGames
        .filter((sg: any) => sg.igdbId !== null)
        .map((sg: any) => ({
          user_id: user.id,
          game_id: sg.igdbId,
          platform: 'steam',
          playtime_minutes: sg.playtimeMinutes,
          status: sg.playtimeMinutes > 0 ? 'playing' : 'backlog',
        }));

      if (userGamesData.length > 0) {
        // Insert in batches to avoid limits
        for (let i = 0; i < userGamesData.length; i += 50) {
          const batch = userGamesData.slice(i, i + 50);
          
          const { error: userGamesError } = await supabase
            .from('user_games')
            .upsert(batch, { 
              onConflict: 'user_id,game_id,platform',
              ignoreDuplicates: true,
            });

          if (userGamesError) {
            console.error('Error saving batch:', userGamesError);
          }
        }
      }

      setSyncProgress('');
      Alert.alert(
        'Success!',
        `Synced ${data.mappedGames} games from Steam to your library.`,
        [{ text: 'OK', onPress: () => onSyncComplete?.() }]
      );
    } catch (error: any) {
      console.error('Error syncing Steam:', error);
      Alert.alert('Error', error.message || 'Failed to sync Steam library');
      setSyncProgress('');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Link Steam Account</Text>
      
      <Text style={styles.description}>
        Enter your Steam ID to automatically sync your game library.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How to find your Steam ID:</Text>
        <Text style={styles.infoText}>
          1. Open your Steam profile in a browser{'\n'}
          2. Look at the URL: steamcommunity.com/profiles/[YOUR_STEAM_ID]{'\n'}
          3. Your Steam ID is the long number after /profiles/{'\n'}
          {'\n'}
          Note: Your profile must be set to PUBLIC for syncing to work.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Steam ID (e.g., 76561197960434622)"
        value={steamId}
        onChangeText={setSteamId}
        keyboardType="numeric"
        editable={!isSyncing}
      />

      <TouchableOpacity
        style={[styles.button, isSyncing && styles.buttonDisabled]}
        onPress={linkSteamAccount}
        disabled={isSyncing}
      >
        {isSyncing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sync Steam Library</Text>
        )}
      </TouchableOpacity>

      {syncProgress !== '' && (
        <View style={styles.progressBox}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.progressText}>{syncProgress}</Text>
        </View>
      )}

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⚠️ First sync may take a few minutes for large libraries due to rate limits.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  progressText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  warningBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#E65100',
  },
});
