import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { searchGames } from '../lib/igdb';
import { IGDBGame, igdbToGame } from '../types/game';
import { supabase } from '../lib/supabase';

interface GameSearchProps {
  onGameAdded?: () => void;
}

export default function GameSearch({ onGameAdded }: GameSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['games', searchTerm],
    queryFn: () => searchGames(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const addGameToLibrary = async (igdbGame: IGDBGame) => {
    if (!selectedPlatform) {
      alert('Please select a platform first');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // First, upsert the game metadata
      const gameData = igdbToGame(igdbGame);
      const { error: gameError } = await supabase
        .from('games')
        .upsert(gameData, { onConflict: 'id' });

      if (gameError) throw gameError;

      // Then add to user's library
      const { error: userGameError } = await supabase
        .from('user_games')
        .insert({
          user_id: user.id,
          game_id: igdbGame.id,
          platform: selectedPlatform,
          status: 'backlog',
        });

      if (userGameError) {
        if (userGameError.code === '23505') {
          alert('Game already in your library!');
        } else {
          throw userGameError;
        }
      } else {
        alert('Game added to library!');
        setSearchTerm('');
        onGameAdded?.();
      }
    } catch (err) {
      console.error('Error adding game:', err);
      alert('Failed to add game');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGame = ({ item }: { item: IGDBGame }) => (
    <TouchableOpacity
      style={styles.gameItem}
      onPress={() => addGameToLibrary(item)}
      disabled={isSubmitting}
    >
      {item.cover && (
        <Image
          source={{
            uri: `https://images.igdb.com/igdb/image/upload/t_cover_small/${item.cover.image_id}.jpg`,
          }}
          style={styles.cover}
        />
      )}
      <View style={styles.gameInfo}>
        <Text style={styles.gameName}>{item.name}</Text>
        {item.first_release_date && (
          <Text style={styles.gameDate}>
            {new Date(item.first_release_date * 1000).getFullYear()}
          </Text>
        )}
        {item.platforms && (
          <Text style={styles.gamePlatforms} numberOfLines={1}>
            {item.platforms.map(p => p.name).join(', ')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Game to Library</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a game..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="none"
      />

      <View style={styles.platformSelector}>
        <Text style={styles.label}>Platform:</Text>
        <View style={styles.platformButtons}>
          {['Steam', 'Xbox', 'PlayStation', 'Nintendo', 'PC'].map((platform) => (
            <TouchableOpacity
              key={platform}
              style={[
                styles.platformButton,
                selectedPlatform === platform && styles.platformButtonActive,
              ]}
              onPress={() => setSelectedPlatform(platform)}
            >
              <Text
                style={[
                  styles.platformButtonText,
                  selectedPlatform === platform && styles.platformButtonTextActive,
                ]}
              >
                {platform}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#007AFF" />}
      
      {error && (
        <Text style={styles.errorText}>
          Error searching games. Try again.
        </Text>
      )}

      {games && games.length === 0 && searchTerm.length > 2 && (
        <Text style={styles.noResults}>No games found</Text>
      )}

      <FlatList
        data={games}
        renderItem={renderGame}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
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
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  platformSelector: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  platformButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  list: {
    flex: 1,
  },
  gameItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  cover: {
    width: 60,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  gameInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  gameName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  gamePlatforms: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
});
