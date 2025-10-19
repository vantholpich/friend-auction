import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Auctions',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="bids"
        options={{
          title: 'My Bids',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>📋</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
