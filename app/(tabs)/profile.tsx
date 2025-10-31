import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const user = {
    name: 'Coffee Lover',
    email: 'hello@kapehan.com',
    memberSince: '2024',
    points: 150,
    tier: 'Gold Member'
  };

  const menuItems = [
    { icon: 'person', title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: 'card', title: 'Payment Methods', subtitle: 'Manage your payment options' },
    { icon: 'time', title: 'Order History', subtitle: 'View your past orders' },
    { icon: 'gift', title: 'Rewards', subtitle: 'Redeem your points' },
    { icon: 'settings', title: 'Settings', subtitle: 'App preferences' },
    { icon: 'help-circle', title: 'Help & Support', subtitle: 'Get assistance' },
  ];

  const stats = [
    { label: 'Orders', value: '24' },
    { label: 'Favorites', value: '8' },
    { label: 'Reviews', value: '12' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Luxury Header */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSubtitle}>WELCOME BACK</Text>
          <Text style={styles.heroTitle}>Coffee Lover</Text>
          <Text style={styles.heroEmail}>hello@kapehan.com</Text>
        </View>

        {/* Premium Stats Card */}
        <View style={styles.statsSection}>
          <View style={styles.tierBadge}>
            <Ionicons name="diamond" size={16} color="#1a1a1a" />
            <Text style={styles.tierText}>GOLD MEMBER</Text>
          </View>
          
          <View style={styles.pointsCard}>
            <View style={styles.pointsContent}>
              <Text style={styles.pointsLabel}>REWARDS POINTS</Text>
              <Text style={styles.pointsValue}>150</Text>
              <Text style={styles.pointsSubtitle}>Available for redemption</Text>
            </View>
            <View style={styles.pointsGraphic}>
              <Ionicons name="trophy" size={40} color="#8B6914" />
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.accountSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionSubtitle}>ACCOUNT</Text>
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          {/* Premium Menu Items */}
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuCard}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={24} color="#8B6914" />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#8B6914" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Membership Info */}
        <View style={styles.membershipSection}>
          <View style={styles.membershipCard}>
            <View style={styles.membershipHeader}>
              <Ionicons name="calendar" size={24} color="#8B6914" />
              <Text style={styles.membershipTitle}>Member Since</Text>
            </View>
            <Text style={styles.membershipValue}>2024</Text>
            <Text style={styles.membershipDescription}>
              Thank you for being part of our coffee community
            </Text>
          </View>
        </View>

        {/* App Info Footer */}
        <View style={styles.footer}>
          <Text style={styles.appVersion}>Kapehan v1.0.0</Text>
          <Text style={styles.appTagline}>Brewing happiness, one cup at a time</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={20} color="#8B6914" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={20} color="#8B6914" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#8B6914" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#1a1a1a',
    padding: 40,
    alignItems: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8B6914',
    letterSpacing: 3,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  heroEmail: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  statsSection: {
    padding: 30,
    paddingTop: 0,
    marginTop: -20,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6914',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    gap: 8,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  pointsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  pointsContent: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B6914',
    letterSpacing: 2,
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  pointsGraphic: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(139, 105, 20, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 1,
  },
  accountSection: {
    padding: 30,
    paddingTop: 0,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B6914',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  menuGrid: {
    gap: 12,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  menuIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  membershipSection: {
    padding: 30,
    paddingTop: 0,
  },
  membershipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EEE6DD',
    alignItems: 'center',
  },
  membershipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  membershipValue: {
    fontSize: 32,
    fontWeight: '300',
    color: '#8B6914',
    marginBottom: 8,
  },
  membershipDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  appVersion: {
    fontSize: 14,
    color: '#8B6914',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#CCCCCC',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  socialButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
});