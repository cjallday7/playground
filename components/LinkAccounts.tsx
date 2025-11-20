import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SteamSync from './SteamSync';
import ManualGameEntry from './ManualGameEntry';

type ActiveTab = 'steam' | 'xbox' | 'playstation' | 'nintendo';

export default function LinkAccounts() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('steam');

  const tabs = [
    { id: 'steam' as ActiveTab, label: 'Steam', color: '#1b2838' },
    { id: 'xbox' as ActiveTab, label: 'Xbox', color: '#107C10' },
    { id: 'playstation' as ActiveTab, label: 'PlayStation', color: '#003087' },
    { id: 'nintendo' as ActiveTab, label: 'Nintendo', color: '#E60012' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && { borderBottomColor: tab.color },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && { color: tab.color, fontWeight: '700' },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'steam' && <SteamSync />}
        
        {activeTab === 'xbox' && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Xbox Integration</Text>
            <Text style={styles.placeholderText}>
              Xbox Live integration requires an OpenXBL API key.
              {'\n\n'}
              Coming soon! In the meantime, use "Add Game" to manually add Xbox games.
            </Text>
          </View>
        )}

        {activeTab === 'playstation' && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>PlayStation Integration</Text>
            <Text style={styles.placeholderText}>
              PSN integration requires extracting your NPSSO token from PlayStation.com cookies.
              {'\n\n'}
              Coming soon! In the meantime, use "Add Game" to manually add PlayStation games.
            </Text>
          </View>
        )}

        {activeTab === 'nintendo' && (
          <View style={styles.nintendoContainer}>
            <Text style={styles.nintendoTitle}>Nintendo Switch</Text>
            <Text style={styles.nintendoText}>
              Nintendo does not provide a public API for game data.
              {'\n\n'}
              You can manually add your Switch games using the form below:
            </Text>
            <ManualGameEntry />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    padding: 20,
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  nintendoContainer: {
    padding: 16,
  },
  nintendoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nintendoText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
});
