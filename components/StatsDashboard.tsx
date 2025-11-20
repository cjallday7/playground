import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export default function StatsDashboard() {
  const { data: userGames, isLoading } = useQuery({
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
            genres
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data as any[];
    },
  });

  const stats = useMemo(() => {
    if (!userGames || userGames.length === 0) {
      return null;
    }

    const totalGames = userGames.length;
    const totalPlaytimeMinutes = userGames.reduce(
      (sum, game) => sum + (game.playtime_minutes || 0),
      0
    );
    const totalPlaytimeHours = Math.floor(totalPlaytimeMinutes / 60);

    const byStatus = {
      backlog: userGames.filter(g => g.status === 'backlog').length,
      playing: userGames.filter(g => g.status === 'playing').length,
      completed: userGames.filter(g => g.status === 'completed').length,
      abandoned: userGames.filter(g => g.status === 'abandoned').length,
    };

    const byPlatform: Record<string, number> = {};
    userGames.forEach(game => {
      byPlatform[game.platform] = (byPlatform[game.platform] || 0) + 1;
    });

    const genreCounts: Record<string, number> = {};
    userGames.forEach(game => {
      if (game.game?.genres) {
        game.game.genres.forEach((genre: string) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      }
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([genre, count]) => ({ genre, count }));

    const mostPlayed = [...userGames]
      .sort((a, b) => (b.playtime_minutes || 0) - (a.playtime_minutes || 0))
      .slice(0, 5);

    const totalAchievements = userGames.reduce(
      (sum, game) => sum + (game.achievements_unlocked || 0),
      0
    );

    const completionRate = byStatus.completed > 0
      ? Math.round((byStatus.completed / totalGames) * 100)
      : 0;

    return {
      totalGames,
      totalPlaytimeHours,
      byStatus,
      byPlatform,
      topGenres,
      mostPlayed,
      totalAchievements,
      completionRate,
    };
  }, [userGames]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No Stats Yet</Text>
        <Text style={styles.emptyText}>
          Add some games to your library to see statistics!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gaming Stats</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalGames}</Text>
            <Text style={styles.statLabel}>Total Games</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalPlaytimeHours}h</Text>
            <Text style={styles.statLabel}>Total Playtime</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalAchievements}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>By Status</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Backlog</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(stats.byStatus.backlog / stats.totalGames) * 100}%`, backgroundColor: '#9E9E9E' },
                ]}
              />
            </View>
            <Text style={styles.progressValue}>{stats.byStatus.backlog}</Text>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Playing</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(stats.byStatus.playing / stats.totalGames) * 100}%`, backgroundColor: '#4CAF50' },
                ]}
              />
            </View>
            <Text style={styles.progressValue}>{stats.byStatus.playing}</Text>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Completed</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(stats.byStatus.completed / stats.totalGames) * 100}%`, backgroundColor: '#2196F3' },
                ]}
              />
            </View>
            <Text style={styles.progressValue}>{stats.byStatus.completed}</Text>
          </View>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Abandoned</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(stats.byStatus.abandoned / stats.totalGames) * 100}%`, backgroundColor: '#F44336' },
                ]}
              />
            </View>
            <Text style={styles.progressValue}>{stats.byStatus.abandoned}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>By Platform</Text>
        <View style={styles.listContainer}>
          {Object.entries(stats.byPlatform).map(([platform, count]) => (
            <View key={platform} style={styles.listItem}>
              <Text style={styles.listItemLabel}>{platform.toUpperCase()}</Text>
              <Text style={styles.listItemValue}>{count} games</Text>
            </View>
          ))}
        </View>
      </View>

      {stats.topGenres.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Genres</Text>
          <View style={styles.listContainer}>
            {stats.topGenres.map(({ genre, count }) => (
              <View key={genre} style={styles.listItem}>
                <Text style={styles.listItemLabel}>{genre}</Text>
                <Text style={styles.listItemValue}>{count} games</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {stats.mostPlayed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Played</Text>
          <View style={styles.listContainer}>
            {stats.mostPlayed.map((game) => (
              <View key={game.id} style={styles.listItem}>
                <Text style={styles.listItemLabel} numberOfLines={1}>
                  {game.game?.title || 'Unknown'}
                </Text>
                <Text style={styles.listItemValue}>
                  {Math.floor((game.playtime_minutes || 0) / 60)}h
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  progressContainer: {
    gap: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
  },
  progressBar: {
    flex: 1,
    height: 24,
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 12,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  listItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  listItemValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});
