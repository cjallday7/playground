import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';

interface GameDetailModalProps {
  game: any;
  visible: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function GameDetailModal({ game, visible, onClose, onUpdate }: GameDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(game?.status || 'backlog');
  const [playtimeHours, setPlaytimeHours] = useState(
    game?.playtime_minutes ? Math.floor(game.playtime_minutes / 60).toString() : '0'
  );

  if (!game) return null;

  const updateGame = async () => {
    try {
      const { error } = await supabase
        .from('user_games')
        .update({
          status,
          playtime_minutes: parseInt(playtimeHours) * 60,
        })
        .eq('id', game.id);

      if (error) throw error;

      Alert.alert('Success', 'Game updated!');
      setIsEditing(false);
      onUpdate?.();
    } catch (error: any) {
      console.error('Error updating game:', error);
      Alert.alert('Error', 'Failed to update game');
    }
  };

  const deleteGame = async () => {
    Alert.alert(
      'Delete Game',
      'Are you sure you want to remove this game from your library?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('user_games')
                .delete()
                .eq('id', game.id);

              if (error) throw error;

              Alert.alert('Success', 'Game removed from library');
              onClose();
              onUpdate?.();
            } catch (error: any) {
              console.error('Error deleting game:', error);
              Alert.alert('Error', 'Failed to delete game');
            }
          },
        },
      ]
    );
  };

  const formatPlaytime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'playing': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'abandoned': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕ Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.editButton}>
              {isEditing ? 'Cancel' : '✎ Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {game.game?.cover_url && (
            <Image
              source={{ uri: game.game.cover_url }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          )}

          <Text style={styles.title}>{game.game?.title || 'Unknown Game'}</Text>

          <View style={styles.metaRow}>
            <Text style={[styles.platform, { color: '#007AFF' }]}>
              {game.platform.toUpperCase()}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(game.status) }]}>
              <Text style={styles.statusText}>{game.status.toUpperCase()}</Text>
            </View>
          </View>

          {game.game?.release_date && (
            <Text style={styles.metadata}>
              Released: {new Date(game.game.release_date).getFullYear()}
            </Text>
          )}

          {game.game?.genres && game.game.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {game.game.genres.map((genre: string, index: number) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          )}

          {game.game?.developer && (
            <Text style={styles.metadata}>Developer: {game.game.developer}</Text>
          )}

          {game.game?.publisher && (
            <Text style={styles.metadata}>Publisher: {game.game.publisher}</Text>
          )}

          <View style={styles.separator} />

          {isEditing ? (
            <View style={styles.editForm}>
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
                      status === s.value && {
                        backgroundColor: getStatusColor(s.value),
                        borderColor: getStatusColor(s.value),
                      },
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

              <Text style={styles.label}>Playtime (hours)</Text>
              <TextInput
                style={styles.input}
                value={playtimeHours}
                onChangeText={setPlaytimeHours}
                keyboardType="numeric"
                placeholder="0"
              />

              <TouchableOpacity style={styles.saveButton} onPress={updateGame}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={deleteGame}>
                <Text style={styles.deleteButtonText}>Remove from Library</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {formatPlaytime(game.playtime_minutes || 0)}
                </Text>
                <Text style={styles.statLabel}>Playtime</Text>
              </View>

              {game.achievements_total > 0 && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {game.achievements_unlocked}/{game.achievements_total}
                  </Text>
                  <Text style={styles.statLabel}>Achievements</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(game.achievements_unlocked / game.achievements_total) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              )}

              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {new Date(game.added_at).toLocaleDateString()}
                </Text>
                <Text style={styles.statLabel}>Added</Text>
              </View>

              {game.last_played_at && (
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>
                    {new Date(game.last_played_at).toLocaleDateString()}
                  </Text>
                  <Text style={styles.statLabel}>Last Played</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 50,
  },
  closeButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  editButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  coverImage: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  platform: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  metadata: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  genreTag: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 13,
    color: '#1976D2',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  statsContainer: {
    gap: 16,
  },
  statBox: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  editForm: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  deleteButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
});
