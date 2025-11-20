import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { supabase } from '../lib/supabase';
import LinkAccounts from './LinkAccounts';

export default function Account() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Link Platforms</Text>
        <Text 
          style={styles.link} 
          onPress={() => supabase.auth.signOut()}
        >
          Sign Out
        </Text>
      </View>
      
      <LinkAccounts />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
