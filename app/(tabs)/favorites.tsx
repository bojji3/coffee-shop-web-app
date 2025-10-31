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

export default function FavoritesScreen() {
  const favorites = [
    {
      id: 1,
      name: 'Caramel Macchiato',
      description: 'Our signature drink with caramel drizzle',
      price: '$5.25',
      emoji: '🍮',
      rating: 4.9,
      isAvailable: true
    },
    {
      id: 2,
      name: 'Iced Latte',
      description: 'Perfect for warm days',
      price: '$4.75',
      emoji: '❄️',
      rating: 4.7,
      isAvailable: true
    },
    {
      id: 3,
      name: 'Hazelnut Brew',
      description: 'Nutty and aromatic',
      price: '$4.50',
      emoji: '🌰',
      rating: 4.8,
      isAvailable: false
    }
  ];

  const stats = {
    totalFavorites: 3,
    mostOrdered: 'Caramel Macchiato',
    totalSpent: '$14.50'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Luxury Header */}
        <View style={styles.heroSection}>
          <Text style={styles.heroSubtitle}>PERSONAL COLLECTION</Text>
          <Text style={styles.heroTitle}>Your Favorites</Text>
          <Text style={styles.heroDescription}>
            Your most loved coffee selections
          </Text>
        </View>

        {/* Favorites Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalFavorites}</Text>
              <Text style={styles.statLabel}>Favorite Items</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.mostOrdered.split(' ')[0]}</Text>
              <Text style={styles.statLabel}>Most Ordered</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
          </View>
        </View>

        {/* Favorites Grid */}
        <View style={styles.favoritesSection}>
          
          {/* Featured Favorite */}
          {favorites.length > 0 && (
            <View style={styles.featuredFavorite}>
              <View style={styles.featuredBadge}>
                <Ionicons name="heart" size={16} color="#1a1a1a" />
                <Text style={styles.featuredBadgeText}>MOST LOVED</Text>
              </View>
              <View style={styles.featuredContent}>
                <View style={styles.featuredEmoji}>
                  <Text style={styles.emoji}>{favorites[0].emoji}</Text>
                </View>
                <View style={styles.featuredText}>
                  <Text style={styles.featuredName}>{favorites[0].name}</Text>
                  <Text style={styles.featuredDescription}>{favorites[0].description}</Text>
                  <View style={styles.featuredPriceContainer}>
                    <Text style={styles.featuredPrice}>{favorites[0].price}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.ratingText}>{favorites[0].rating}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Favorites List */}
          <View style={styles.favoritesGrid}>
            {favorites.map((item, index) => (
              <View key={item.id} style={[
                styles.favoriteCard,
                index === 0 && styles.featuredItem,
                !item.isAvailable && styles.unavailableItem
              ]}>
                <View style={styles.favoriteHeader}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <View style={styles.favoriteActions}>
                    {!item.isAvailable && (
                      <View style={styles.unavailableBadge}>
                        <Text style={styles.unavailableText}>SOLD OUT</Text>
                      </View>
                    )}
                    <TouchableOpacity style={styles.heartButton}>
                      <Ionicons name="heart" size={24} color="#e53e3e" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={styles.favoriteContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <TouchableOpacity 
                      style={[
                        styles.orderButton,
                        !item.isAvailable && styles.disabledButton
                      ]}
                      disabled={!item.isAvailable}
                    >
                      <Ionicons name="cart" size={16} color="#fff" />
                      <Text style={styles.orderButtonText}>
                        {item.isAvailable ? 'Order Again' : 'Unavailable'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Empty State */}
          {favorites.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="heart-outline" size={64} color="#8B6914" />
              </View>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyDescription}>
                Start adding your favorite coffees from our menu to see them here
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore Menu</Text>
                <Ionicons name="cafe" size={20} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
          )}

          {/* Recommendations */}
          <View style={styles.recommendationsSection}>
            <Text style={styles.recommendationsTitle}>You Might Also Like</Text>
            <View style={styles.recommendationsGrid}>
              <TouchableOpacity style={styles.recommendationCard}>
                <Text style={styles.recommendationEmoji}>☕</Text>
                <Text style={styles.recommendationName}>Vanilla Cold Brew</Text>
                <Text style={styles.recommendationPrice}>$4.25</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.recommendationCard}>
                <Text style={styles.recommendationEmoji}>🎃</Text>
                <Text style={styles.recommendationName}>Pumpkin Spice</Text>
                <Text style={styles.recommendationPrice}>$5.50</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 12,
    letterSpacing: 1,
  },
  heroDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsSection: {
    padding: 30,
    paddingTop: 0,
    marginTop: -20,
  },
  statsCard: {
    flexDirection: 'row',
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
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
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
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEE6DD',
    marginHorizontal: 16,
  },
  favoritesSection: {
    padding: 30,
    paddingTop: 0,
  },
  featuredFavorite: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 30,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6914',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 20,
    gap: 6,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredEmoji: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(139, 105, 20, 0.2)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  emoji: {
    fontSize: 32,
  },
  featuredText: {
    flex: 1,
  },
  featuredName: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredPrice: {
    fontSize: 28,
    fontWeight: '300',
    color: '#8B6914',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '500',
  },
  favoritesGrid: {
    gap: 16,
    marginBottom: 30,
  },
  favoriteCard: {
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
  featuredItem: {
    display: 'none', // Hide featured item from grid since it's shown above
  },
  unavailableItem: {
    opacity: 0.6,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemEmoji: {
    fontSize: 32,
  },
  favoriteActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  unavailableBadge: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  unavailableText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heartButton: {
    padding: 4,
  },
  favoriteContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 16,
    flex: 1,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '300',
    color: '#8B6914',
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6914',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  orderButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  emptyState: {
    alignItems: 'center',
    padding: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  emptyIcon: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6914',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  recommendationsSection: {
    marginTop: 20,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  recommendationCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  recommendationEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  recommendationPrice: {
    fontSize: 16,
    fontWeight: '300',
    color: '#8B6914',
  },
});