import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B6914',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 0,
          paddingTop: 8,
          position: 'absolute',
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 6,
          marginBottom: 8,
          letterSpacing: 0.5,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.floatingIconContainer, focused && styles.floatingActiveIcon]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={focused ? 24 : 22} 
                color={focused ? '#1a1a1a' : color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.floatingIconContainer, focused && styles.floatingActiveIcon]}>
              <Ionicons 
                name={focused ? "bag-handle" : "bag-handle-outline"} 
                size={focused ? 24 : 22} 
                color={focused ? '#1a1a1a' : color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.floatingIconContainer, focused && styles.floatingActiveIcon]}>
              <Ionicons 
                name={focused ? "cafe" : "cafe-outline"} 
                size={focused ? 24 : 22} 
                color={focused ? '#1a1a1a' : color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.floatingIconContainer, focused && styles.floatingActiveIcon]}>
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={focused ? 24 : 22} 
                color={focused ? '#1a1a1a' : color} 
              />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[styles.floatingIconContainer, focused && styles.floatingActiveIcon]}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={focused ? 24 : 22} 
                color={focused ? '#1a1a1a' : color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  floatingIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    marginTop: 4,
  },
  floatingActiveIcon: {
    backgroundColor: '#8B6914',
    shadowColor: '#8B6914',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    transform: [{ scale: 1.1 }],
  },
});