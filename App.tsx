import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import { View, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameSearch from './components/GameSearch';
import GameLibrary from './components/GameLibrary';
import StatsDashboard from './components/StatsDashboard';
import Account from './components/Account';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Library" 
        component={GameLibrary}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Add Game" 
        component={GameSearch}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Platforms" 
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={styles.container}>
          {session && session.user ? <MainApp /> : <Auth />}
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
