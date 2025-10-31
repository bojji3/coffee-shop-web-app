import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollY = new Animated.Value(0);

  const parallaxHeader = scrollY.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [0, -height * 0.3],
    extrapolate: 'clamp',
  });

  const parallaxBackground = scrollY.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [0, -height * 0.1],
    extrapolate: 'clamp',
  });

  const opacityHeader = scrollY.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          contentContainerStyle={styles.scrollViewContent}
        >
          
          {/* Luxury Hero Section with Parallax */}
          <Animated.View 
            style={[
              styles.heroSection,
              {
                transform: [{ translateY: parallaxHeader }],
                opacity: opacityHeader
              }
            ]}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', 'transparent']}
              style={styles.heroGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroSubtitle}>ARTISAN COFFEE EXPERIENCE</Text>
                <Text style={styles.heroTitle}>
                  The best quality coffee beans{"\n"}for the perfect brew
                </Text>
                <Text style={styles.heroDescription}>
                  Single-origin beans, ethically sourced and roasted to perfection. 
                  Each cup tells a story of craftsmanship and passion.
                </Text>
                
                {/* Divider */}
                <View style={styles.heroDivider} />
                
                <TouchableOpacity style={styles.ctaButton}>
                  <LinearGradient
                    colors={['#8B6914', '#A47C3C', '#8B6914']}
                    style={styles.ctaGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.ctaButtonText}>Experience Excellence</Text>
                    <Ionicons name="arrow-forward" size={20} color="#1a1a1a" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Premium Products Section */}
          <View style={styles.productsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionSubtitle}>CURATED SELECTION</Text>
              <Text style={styles.sectionTitle}>Signature Creations</Text>
              <View style={styles.titleDivider} />
            </View>

            {/* Premium Product Cards with Glass Morphism */}
            <View style={styles.productsGrid}>
              
              {/* Product 1 - Luxury Card */}
              <BlurView intensity={90} tint="dark" style={styles.premiumCard}>
                <View style={styles.productBadge}>
                  <Ionicons name="trophy" size={12} color="#1a1a1a" />
                  <Text style={styles.badgeText}>BESTSELLER</Text>
                </View>
                <View style={styles.productImageContainer}>
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop&crop=center' }}
                    style={styles.productImage}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.3)']}
                      style={styles.imageOverlay}
                    />
                  </ImageBackground>
                </View>
                <View style={styles.productContent}>
                  <Text style={styles.productPrice}>$6.50</Text>
                  <Text style={styles.productName}>Espresso Con Pana</Text>
                  <Text style={styles.productDescription}>With artisanal butterscotch drizzle and homemade whipped cream</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>(138 reviews)</Text>
                  </View>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Ionicons name="add" size={20} color="#8B6914" />
                  </TouchableOpacity>
                </View>
              </BlurView>

              {/* Product 2 - Luxury Card */}
              <BlurView intensity={90} tint="dark" style={styles.premiumCard}>
                <View style={[styles.productBadge, styles.seasonalBadge]}>
                  <Ionicons name="leaf" size={12} color="#1a1a1a" />
                  <Text style={styles.badgeText}>SEASONAL</Text>
                </View>
                <View style={styles.productImageContainer}>
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center' }}
                    style={styles.productImage}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.3)']}
                      style={styles.imageOverlay}
                    />
                  </ImageBackground>
                </View>
                <View style={styles.productContent}>
                  <Text style={styles.productPrice}>$5.20</Text>
                  <Text style={styles.productName}>Iced Mocha</Text>
                  <Text style={styles.productDescription}>With organic peppermint infusion and dark chocolate</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>(96 reviews)</Text>
                  </View>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Ionicons name="add" size={20} color="#8B6914" />
                  </TouchableOpacity>
                </View>
              </BlurView>

            </View>

            {/* Premium Search with Glass Effect */}
            <BlurView intensity={80} tint="dark" style={styles.premiumSearchContainer}>
              <Ionicons name="search" size={22} color="#8B6914" />
              <TextInput
                style={styles.premiumSearchInput}
                placeholder="Discover your perfect blend..."
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.searchButton}>
                <LinearGradient
                  colors={['#8B6914', '#A47C3C']}
                  style={styles.searchButtonGradient}
                >
                  <Ionicons name="options" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>

            {/* Featured Luxury Product */}
            <BlurView intensity={95} tint="dark" style={styles.featuredLuxuryCard}>
              <View style={styles.featuredBadge}>
                <Ionicons name="diamond" size={14} color="#1a1a1a" />
                <Text style={styles.featuredBadgeText}>PREMIUM BLEND</Text>
              </View>
              <View style={styles.featuredContent}>
                <View style={styles.featuredText}>
                  <Text style={styles.featuredSubtitle}>EXCLUSIVE OFFER</Text>
                  <Text style={styles.featuredName}>Sumatra Mandheling</Text>
                  <Text style={styles.featuredDescription}>
                    Rare single-origin with notes of dark chocolate, cedar, and subtle spice. 
                    Limited harvest from sustainable farms.
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.featuredPrice}>$24.10</Text>
                    <Text style={styles.featuredWeight}>/ 250gr</Text>
                  </View>
                  <View style={styles.featuredStats}>
                    <View style={styles.stat}>
                      <Ionicons name="star" size={14} color="#8B6914" />
                      <Text style={styles.statText}>4.9 Rating</Text>
                    </View>
                    <View style={styles.stat}>
                      <Ionicons name="time" size={14} color="#8B6914" />
                      <Text style={styles.statText}>Fresh Roasted</Text>
                    </View>
                    <View style={styles.stat}>
                      <Ionicons name="leaf" size={14} color="#8B6914" />
                      <Text style={styles.statText}>Organic</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.featuredImageContainer}>
                  <ImageBackground 
                    source={{ uri: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop&crop=center' }}
                    style={styles.featuredImage}
                    resizeMode="cover"
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.4)']}
                      style={styles.featuredImageOverlay}
                    />
                  </ImageBackground>
                </View>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <LinearGradient
                  colors={['#8B6914', '#A47C3C', '#8B6914']}
                  style={styles.addToCartGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.addToCartText}>ADD TO CART</Text>
                  <Ionicons name="bag-handle" size={18} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>

          </View>

          {/* Luxury Features with Enhanced Design */}
          <BlurView intensity={90} tint="dark" style={styles.luxuryFeatures}>
            <View style={styles.featuresHeader}>
              <Text style={styles.featuresTitle}>Why We're Exceptional</Text>
              <Text style={styles.featuresSubtitle}>Crafting perfection in every cup</Text>
            </View>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <LinearGradient
                  colors={['rgba(139, 105, 20, 0.1)', 'rgba(139, 105, 20, 0.05)']}
                  style={styles.featureIconContainer}
                >
                  <Ionicons name="leaf" size={32} color="#8B6914" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Organic & Sustainable</Text>
                <Text style={styles.featureDescription}>
                  Ethically sourced from family-owned farms practicing regenerative agriculture
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <LinearGradient
                  colors={['rgba(139, 105, 20, 0.1)', 'rgba(139, 105, 20, 0.05)']}
                  style={styles.featureIconContainer}
                >
                  <Ionicons name="trophy" size={32} color="#8B6914" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Award Winning</Text>
                <Text style={styles.featureDescription}>
                  2024 Golden Bean Roaster of the Year with international recognition
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <LinearGradient
                  colors={['rgba(139, 105, 20, 0.1)', 'rgba(139, 105, 20, 0.05)']}
                  style={styles.featureIconContainer}
                >
                  <Ionicons name="time" size={32} color="#8B6914" />
                </LinearGradient>
                <Text style={styles.featureTitle}>Fresh Daily Roast</Text>
                <Text style={styles.featureDescription}>
                  Small-batch roasted to order ensuring maximum freshness and flavor complexity
                </Text>
              </View>
            </View>
          </BlurView>

          {/* Newsletter Section */}
          <BlurView intensity={85} tint="dark" style={styles.newsletterSection}>
            <LinearGradient
              colors={['rgba(139, 105, 20, 0.2)', 'rgba(139, 105, 20, 0.1)']}
              style={styles.newsletterGradient}
            >
              <Text style={styles.newsletterTitle}>Join Our Coffee Club</Text>
              <Text style={styles.newsletterDescription}>
                Get exclusive access to limited editions, brewing tips, and member-only discounts
              </Text>
              <View style={styles.newsletterForm}>
                <TextInput
                  style={styles.newsletterInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity style={styles.newsletterButton}>
                  <LinearGradient
                    colors={['#8B6914', '#A47C3C']}
                    style={styles.newsletterButtonGradient}
                  >
                    <Text style={styles.newsletterButtonText}>SUBSCRIBE</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </BlurView>

        </Animated.ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  // Enhanced Hero Section
  heroSection: {
    height: 600,
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  heroContent: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8B6914',
    letterSpacing: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '200',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 20,
    letterSpacing: 1,
  },
  heroDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    maxWidth: 320,
  },
  heroDivider: {
    height: 2,
    backgroundColor: '#8B6914',
    width: '60%',
    marginVertical: 30,
  },
  ctaButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#8B6914',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  ctaGradient: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    gap: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  // Enhanced Products Section
  productsSection: {
    padding: 30,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8B6914',
    letterSpacing: 3,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '200',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  titleDivider: {
    height: 2,
    backgroundColor: '#8B6914',
    width: 80,
    marginTop: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  premiumCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    borderRadius: 24,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 15,
  },
  productBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B6914',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
    zIndex: 10,
  },
  seasonalBadge: {
    backgroundColor: '#2E8B57',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  productImageContainer: {
    width: '100%',
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  productContent: {
    padding: 20,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '300',
    color: '#8B6914',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 16,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  // Enhanced Search
  premiumSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.6)',
    borderRadius: 25,
    padding: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
  },
  premiumSearchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  searchButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    padding: 10,
    borderRadius: 20,
  },
  // Enhanced Featured Product
  featuredLuxuryCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 28,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
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
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featuredText: {
    flex: 1,
    marginRight: 20,
  },
  featuredSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B6914',
    letterSpacing: 2,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 26,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 30,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  featuredPrice: {
    fontSize: 32,
    fontWeight: '200',
    color: '#8B6914',
  },
  featuredWeight: {
    fontSize: 16,
    color: '#8B6914',
    marginLeft: 4,
    opacity: 0.8,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: 15,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#8B6914',
    fontWeight: '500',
  },
  featuredImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredImageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  addToCartButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  // Enhanced Features Section
  luxuryFeatures: {
    padding: 40,
    marginHorizontal: 20,
    borderRadius: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
  },
  featuresHeader: {
    alignItems: 'center',
    marginBottom: 35,
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: '200',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  featuresSubtitle: {
    fontSize: 14,
    color: '#8B6914',
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 25,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Newsletter Section
  newsletterSection: {
    marginHorizontal: 25,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
  },
  newsletterGradient: {
    padding: 35,
    alignItems: 'center',
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  newsletterDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
    maxWidth: 280,
  },
  newsletterForm: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  newsletterInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  newsletterButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  newsletterButtonGradient: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    gap: 8,
  },
  newsletterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});