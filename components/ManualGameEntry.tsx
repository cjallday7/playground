import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { searchGames } from '../lib/igdb';
import { supabase } from '../lib/supabase';
import { igdbToGame } from '../types/game';

export default function ManualGameEntry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [platform, setPlatform] = useState('');
  const [playtimeHours, setPlaytimeHours] = useState('');
  const [status, setStatus] = useState<'backlog' | 'playing' | 'completed' | 'abandoned'>('backlog');

  const { data: games, isLoading } = useQuery({
    queryKey: ['manualSearch', searchTerm],
    queryFn: () => searchGames(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const addGame = async () => {
    if (!selectedGame || !platform) {
      Alert.alert('Error', 'Please select a game and platform');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Add game metadata
      const gameData = igdbToGame(selectedGame);
      const { error: gameError } = await supabase
        .from('games')
        .upsert(gameData, { onConflict: 'id' });

      if (gameError) throw gameError;

      // Add to user's library
      const { error: userGameError } = await supabase
        .from('user_games')
        .insert({
          user_id: user.id,
          game_id: selectedGame.id,
          platform,
          playtime_minutes: playtimeHours ? parseInt(playtimeHours) * 60 : 0,
          status,
        });

      if (userGameError) {
        if (userGameError.code === '23505') {
          Alert.alert('Already Added', 'This game is already in your library');
        } else {
          throw userGameError;
        }
      } else {
        Alert.alert('Success', 'Game added to library!');
        setSelectedGame(null);
        setSearchTerm('');
        setPlatform('');
        setPlaytimeHours('');
      }
    } catch (error: any) {
      console.error('Error adding game:', error);
      Alert.alert('Error', 'Failed to add game');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Game Manually</Text>
      <Text style={styles.subtitle}>
        For Nintendo Switch or other platforms without automatic sync
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a game..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {isLoading && <Text style={styles.loading}>Searching...</Text>}

      {games && games.length > 0 && (
        <View style={styles.resultsContainer}>
          {games.slice(0, 5).map((game: any) => (
            <TouchableOpacity
              key={game.id}
              style={[
                styles.gameOption,
                selectedGame?.id === game.id && styles.gameOptionSelected,
              ]}
              onPress={() => setSelectedGame(game)}
            >
              <Text style={styles.gameName}>{game.name}</Text>
              {game.first_release_date && (
                <Text style={styles.gameYear}>
                  {new Date(game.first_release_date * 1000).getFullYear()}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedGame && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Selected: {selectedGame.name}</Text>

          <Text style={styles.label}>Platform</Text>
          <View style={styles.platformButtons}>
            {['Nintendo Switch', 'PC', 'Xbox', 'PlayStation', 'Other'].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.platformButton,
                  platform === p && styles.platformButtonActive,
                ]}
                onPress={() => setPlatform(p)}
              >
                <Text
                  style={[
                    styles.platformButtonText,
                    platform === p && styles.platformButtonTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Playtime (hours) - Optional</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 25"
            value={playtimeHours}
            onChangeText={setPlaytimeHours}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Status</Text>
          <View style={styles.statusButtons}>
            {[
              { value: 'backlog', label: 'Backlog' },
              { value: 'playing', label: 'Playing' },
              { value: 'completed', label: 'Completed' },
              { value: 'abandoned', label: 'Abandoned' },
            ].map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[
                  styles.statusButton,
                  status === s.value && styles.statusButtonActive,
                ]}
                onPress={() => setStatus(s.value as any)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === s.value && styles.statusButtonTextActive,
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addGame}>
            <Text style={styles.addButtonText}>Add to Library</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 12,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  gameOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  gameOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  gameName: {
    fontSize: 16,
    fontWeight: '600',
  },
  gameYear: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  platformButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  platformButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  platformButtonActive: {
    backgroundColor: '#007AFF',
  },
  platformButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  platformButtonTextActive: {
    color: '#fff',
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#fff',
  },
  statusButtonActive: {
    backgroundColor: '#666',
  },
  statusButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
