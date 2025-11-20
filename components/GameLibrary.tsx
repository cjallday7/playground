import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { UserGame } from '../types/game';
import GameDetailModal from './GameDetailModal';

export default function GameLibrary() {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'playtime'>('recent');

  const { data: userGames, isLoading, refetch } = useQuery({
    queryKey: ['userGames'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('user_games')
        .select(`
          *,
          game:games (
            id,
            title,
            cover_url,
            release_date,
            genres,
            platforms
          )
        `)
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) throw error;
      return data as any[];
    },
  });

  const filteredAndSortedGames = useMemo(() => {
    if (!userGames) return [];

    let filtered = userGames.filter((game) => {
      const matchesSearch = game.game?.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPlatform = !filterPlatform || game.platform === filterPlatform;
      const matchesStatus = !filterStatus || game.status === filterStatus;
      
      return matchesSearch && matchesPlatform && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.game?.title || '').localeCompare(b.game?.title || '');
        case 'playtime':
          return (b.playtime_minutes || 0) - (a.playtime_minutes || 0);
        case 'recent':
        default:
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();
      }
    });

    return filtered;
  }, [userGames, searchQuery, filterPlatform, filterStatus, sortBy]);

  const platforms = useMemo(() => {
    if (!userGames) return [];
    return [...new Set(userGames.map(g => g.platform))];
  }, [userGames]);

  const formatPlaytime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const renderGame = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => setSelectedGame(item)}
    >
      {item.game?.cover_url && (
        <Image
          source={{ uri: item.game.cover_url }}
          style={styles.cover}
          resizeMode="cover"
        />
      )}
      <View style={styles.gameInfo}>
        <Text style={styles.gameTitle} numberOfLines={2}>
          {item.game?.title || 'Unknown Game'}
        </Text>
        <Text style={styles.platform}>{item.platform.toUpperCase()}</Text>
        {item.playtime_minutes > 0 && (
          <Text style={styles.playtime}>
            {formatPlaytime(item.playtime_minutes)} played
          </Text>
        )}
        {item.achievements_total > 0 && (
          <Text style={styles.achievements}>
            {item.achievements_unlocked}/{item.achievements_total} achievements
          </Text>
        )}
        <View style={[styles.statusBadge, styles[`status_${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userGames || userGames.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>Your Library is Empty</Text>
        <Text style={styles.emptyText}>
          Add games manually or sync your Steam library to get started!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Library</Text>
        <Text style={styles.count}>{filteredAndSortedGames.length} games</Text>
      </View>

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Platform:</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, !filterPlatform && styles.filterButtonActive]}
              onPress={() => setFilterPlatform(null)}
            >
              <Text style={[styles.filterButtonText, !filterPlatform && styles.filterButtonTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {platforms.map((platform) => (
              <TouchableOpacity
                key={platform}
                style={[
                  styles.filterButton,
                  filterPlatform === platform && styles.filterButtonActive,
                ]}
                onPress={() => setFilterPlatform(platform)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterPlatform === platform && styles.filterButtonTextActive,
                  ]}
                >
                  {platform}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Status:</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={[styles.filterButton, !filterStatus && styles.filterButtonActive]}
              onPress={() => setFilterStatus(null)}
            >
              <Text style={[styles.filterButtonText, !filterStatus && styles.filterButtonTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {['backlog', 'playing', 'completed', 'abandoned'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filterStatus === status && styles.filterButtonActive,
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterStatus === status && styles.filterButtonTextActive,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Sort:</Text>
          <View style={styles.filterButtons}>
            {[
              { value: 'recent' as const, label: 'Recent' },
              { value: 'title' as const, label: 'A-Z' },
              { value: 'playtime' as const, label: 'Playtime' },
            ].map((sort) => (
              <TouchableOpacity
                key={sort.value}
                style={[
                  styles.filterButton,
                  sortBy === sort.value && styles.filterButtonActive,
                ]}
                onPress={() => setSortBy(sort.value)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    sortBy === sort.value && styles.filterButtonTextActive,
                  ]}
                >
                  {sort.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={filteredAndSortedGames}
        renderItem={renderGame}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
      />

      <GameDetailModal
        game={selectedGame}
        visible={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        onUpdate={() => {
          refetch();
          setSelectedGame(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  controls: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  list: {
    padding: 8,
  },
  gameCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: '48%',
  },
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
  },
  gameInfo: {
    padding: 12,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  platform: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  playtime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  achievements: {
    fontSize: 11,
    color: '#888',
    marginBottom: 6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  status_backlog: {
    backgroundColor: '#9E9E9E',
  },
  status_playing: {
    backgroundColor: '#4CAF50',
  },
  status_completed: {
    backgroundColor: '#2196F3',
  },
  status_abandoned: {
    backgroundColor: '#F44336',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
