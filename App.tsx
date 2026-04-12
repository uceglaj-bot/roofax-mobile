import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, ActivityIndicator } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { PlansScreen } from './src/screens/PlansScreen';
import { ServiceScreen } from './src/screens/ServiceScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ForcePasswordScreen } from './src/screens/ForcePasswordScreen';
import { loadSession, getSession, clearSession } from './src/lib/api';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TEAL = '#00C9A7';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  mustChangePassword?: boolean;
}

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🏠', Activity: '📋', Service: '🔧', Plans: '🛡️', Settings: '⚙️',
  };
  return <Text style={{ fontSize: name === 'Service' ? 20 : 22, opacity: focused ? 1 : 0.4 }}>{icons[name] ?? '📌'}</Text>;
}

function MainTabs({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: TEAL,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginTop: -2 },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 10,
          height: 88,
          paddingBottom: 30,
          paddingTop: 8,
        },
        headerStyle: { backgroundColor: '#fff', shadowColor: 'transparent', elevation: 0 },
        headerTitleStyle: { fontWeight: '800', fontSize: 17, color: '#0f172a' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 20, fontWeight: '900', color: '#000' }}>
              Roof<Text style={{ color: TEAL }}>ax</Text>
            </Text>
          ),
        }}
      />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          headerTitle: 'Request Service',
          tabBarLabel: 'Service',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '700', color: TEAL },
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
        options={{ headerTitle: 'Membership' }}
      />
      <Tab.Screen name="Settings">
        {(props) => <SettingsScreen {...props} user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);

  useEffect(() => {
    (async () => {
      await loadSession();
      const session = await getSession();
      if (session.data?.user && session.data.user.role === 'HOMEOWNER') {
        setUser(session.data.user);
        if (session.data.user.mustChangePassword) {
          setNeedsPasswordChange(true);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    if (u.mustChangePassword) {
      setNeedsPasswordChange(true);
    }
  };

  const handleLogout = async () => {
    await clearSession();
    setUser(null);
    setNeedsPasswordChange(false);
  };

  const handlePasswordChanged = () => {
    setNeedsPasswordChange(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color={TEAL} />
      </View>
    );
  }

  if (!user) {
    return (
      <>
        <StatusBar style="dark" />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  if (needsPasswordChange) {
    return (
      <>
        <StatusBar style="dark" />
        <ForcePasswordScreen onComplete={handlePasswordChanged} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MainTabs user={user} onLogout={handleLogout} />
    </NavigationContainer>
  );
}
