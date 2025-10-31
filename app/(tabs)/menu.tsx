import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Enhanced Animation helper functions
const animatePress = (scaleAnim: Animated.Value, toValue: number) => {
  Animated.spring(scaleAnim, {
    toValue,
    useNativeDriver: true,
    speed: 50,
    bounciness: 12,
  }).start();
};

const pulseAnimation = (pulseAnim: Animated.Value) => {
  pulseAnim.setValue(0);
  Animated.sequence([
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }),
    Animated.timing(pulseAnim, {
      toValue: 0.8,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }),
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 100,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }),
  ]).start();
};

const floatingCartAnimation = (floatAnim: Animated.Value) => {
  floatAnim.setValue(0);
  
  // Create separate animations for different properties
  const opacityAnim = new Animated.Value(0);
  const translateYAnim = new Animated.Value(50);
  
  Animated.sequence([
    Animated.parallel([
      // Move up animation
      Animated.timing(translateYAnim, {
        toValue: -20,
        duration: 600,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }),
      // Fade in animation
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]),
    Animated.delay(1200),
    Animated.parallel([
      // Fade out animation
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.bezier(0.55, 0.085, 0.68, 0.53),
        useNativeDriver: true,
      }),
      // Move slightly more up while fading out
      Animated.timing(translateYAnim, {
        toValue: -30,
        duration: 400,
        useNativeDriver: true,
      })
    ])
  ]).start(() => {
    // Reset values after animation completes
    opacityAnim.setValue(0);
    translateYAnim.setValue(50);
  });

  // Update the main floatAnim for the component to use
  Animated.timing(floatAnim, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  }).start();
};

const shimmerAnimation = (shimmerAnim: Animated.Value) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shimmerAnim, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();
};

// Parallax scrolling effect
const createParallaxAnimation = (scrollY: Animated.Value, speed: number) => {
  return scrollY.interpolate({
    inputRange: [0, height * 0.5],
    outputRange: [0, -height * speed],
    extrapolate: 'clamp',
  });
};

export default function MenuScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(0));
  const [floatAnim] = useState(new Animated.Value(0));
  const [shimmerAnim] = useState(new Animated.Value(0));
  const [scrollY] = useState(new Animated.Value(0));
  const [showFloatingCart, setShowFloatingCart] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('featured');
  const [cartPulse, setCartPulse] = useState(new Animated.Value(1));
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  // Enhanced coffee menu with significantly more items and categories
  const coffeeMenu = {
    featured: [
      {
        id: 1,
        name: 'Artisan Latte',
        description: 'Smooth espresso with velvety steamed milk and delicate foam',
        price: '$4.75',
        rating: 4.8,
        reviews: 142,
        preparationTime: '3-4 min',
        calories: '120 cal',
        image: { uri: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Double Espresso', 'Steamed Milk', 'Microfoam'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Colombia'
      },
      {
        id: 2,
        name: 'Signature Espresso',
        description: 'Intense and robust single-origin coffee shot with rich crema',
        price: '$3.50',
        rating: 4.6,
        reviews: 89,
        preparationTime: '2-3 min',
        calories: '5 cal',
        image: { uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Premium Arabica Beans', 'Precision Extraction'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Ethiopia'
      },
      {
        id: 3,
        name: 'Honey Cinnamon Latte',
        description: 'Sweet honey and warm cinnamon infused latte with organic ingredients',
        price: '$5.25',
        rating: 4.9,
        reviews: 203,
        preparationTime: '4-5 min',
        calories: '150 cal',
        image: { uri: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Steamed Milk', 'Organic Honey', 'Cinnamon'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Brazil'
      },
      {
        id: 4,
        name: 'Caramel Macchiato',
        description: 'Layered espresso with vanilla syrup and caramel drizzle masterpiece',
        price: '$5.50',
        rating: 4.7,
        reviews: 178,
        preparationTime: '4-5 min',
        calories: '180 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Steamed Milk', 'Vanilla', 'Caramel'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Guatemala'
      },
      {
        id: 5,
        name: 'Vanilla Bean Latte',
        description: 'Real vanilla bean infused latte with delicate foam art',
        price: '$5.75',
        rating: 4.8,
        reviews: 156,
        preparationTime: '4-5 min',
        calories: '165 cal',
        image: { uri: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Steamed Milk', 'Vanilla Bean', 'Microfoam'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Costa Rica'
      },
      {
        id: 6,
        name: 'Mocha Dream',
        description: 'Rich chocolate and espresso delight with whipped cream',
        price: '$5.95',
        rating: 4.9,
        reviews: 234,
        preparationTime: '5-6 min',
        calories: '210 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Dark Chocolate', 'Steamed Milk', 'Whipped Cream'],
        featured: true,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Peru'
      }
    ],
    classic: [
      {
        id: 7,
        name: 'Cappuccino Classico',
        description: 'Perfect balance of espresso, steamed milk, and thick foam',
        price: '$4.50',
        rating: 4.7,
        reviews: 156,
        preparationTime: '4-5 min',
        calories: '110 cal',
        image: { uri: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Steamed Milk', 'Dense Foam'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Italy'
      },
      {
        id: 8,
        name: 'Americano Elegante',
        description: 'Rich espresso diluted with hot water for smooth complexity',
        price: '$3.75',
        rating: 4.4,
        reviews: 78,
        preparationTime: '3-4 min',
        calories: '10 cal',
        image: { uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Double Espresso', 'Filtered Hot Water'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'USA'
      },
      {
        id: 9,
        name: 'Flat White',
        description: 'Velvety microfoam over a double ristretto shot',
        price: '$4.95',
        rating: 4.8,
        reviews: 134,
        preparationTime: '4-5 min',
        calories: '105 cal',
        image: { uri: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Double Ristretto', 'Microfoam'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Australia'
      },
      {
        id: 10,
        name: 'Cortado',
        description: 'Equal parts espresso and warm milk in perfect harmony',
        price: '$4.25',
        rating: 4.5,
        reviews: 92,
        preparationTime: '3-4 min',
        calories: '80 cal',
        image: { uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Warm Milk'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Spain'
      },
      {
        id: 11,
        name: 'Macchiato',
        description: 'Espresso stained with a dollop of foam artistry',
        price: '$3.95',
        rating: 4.3,
        reviews: 67,
        preparationTime: '2-3 min',
        calories: '25 cal',
        image: { uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Milk Foam'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Italy'
      },
      {
        id: 12,
        name: 'Red Eye',
        description: 'Brewed coffee with an espresso shot for extra kick',
        price: '$4.75',
        rating: 4.6,
        reviews: 89,
        preparationTime: '3-4 min',
        calories: '15 cal',
        image: { uri: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Brewed Coffee', 'Espresso Shot'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Very High',
        origin: 'Mixed'
      },
      {
        id: 13,
        name: 'Cafe Au Lait',
        description: 'French-style coffee with steamed milk',
        price: '$4.35',
        rating: 4.2,
        reviews: 56,
        preparationTime: '3-4 min',
        calories: '90 cal',
        image: { uri: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Brewed Coffee', 'Steamed Milk'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'France'
      },
      {
        id: 14,
        name: 'Doppio',
        description: 'Double shot of pure espresso intensity',
        price: '$4.25',
        rating: 4.7,
        reviews: 112,
        preparationTime: '2-3 min',
        calories: '10 cal',
        image: { uri: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Double Espresso'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Very High',
        origin: 'Italy'
      }
    ],
    iced: [
      {
        id: 15,
        name: 'Iced Caramel Macchiato',
        description: 'Layered iced coffee with vanilla and caramel drizzle masterpiece',
        price: '$5.75',
        rating: 4.9,
        reviews: 203,
        preparationTime: '4-5 min',
        calories: '180 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Cold Milk', 'Vanilla', 'Caramel'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'USA'
      },
      {
        id: 16,
        name: 'Cold Brew Reserve',
        description: 'Smooth 20-hour steeped cold brew with chocolate notes',
        price: '$4.95',
        rating: 4.8,
        reviews: 167,
        preparationTime: '1-2 min',
        calories: '8 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Cold Brew Concentrate', 'Ice', 'Optional Cream'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Colombia'
      },
      {
        id: 17,
        name: 'Iced Vanilla Latte',
        description: 'Chilled espresso with vanilla syrup and milk perfection',
        price: '$5.25',
        rating: 4.7,
        reviews: 145,
        preparationTime: '3-4 min',
        calories: '140 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Cold Milk', 'Vanilla Syrup'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Brazil'
      },
      {
        id: 18,
        name: 'Nitro Cold Brew',
        description: 'Cascading cold brew infused with nitrogen for creamy texture',
        price: '$5.50',
        rating: 4.9,
        reviews: 189,
        preparationTime: '1-2 min',
        calories: '5 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Nitro Cold Brew', 'Ice'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Ethiopia'
      },
      {
        id: 19,
        name: 'Iced Mocha',
        description: 'Chocolate espresso delight served chilled with whipped cream',
        price: '$5.75',
        rating: 4.6,
        reviews: 123,
        preparationTime: '4-5 min',
        calories: '190 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Chocolate', 'Cold Milk', 'Whipped Cream'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Medium',
        origin: 'Mixed'
      },
      {
        id: 20,
        name: 'Iced Americano',
        description: 'Espresso shots poured over ice and filtered water',
        price: '$4.25',
        rating: 4.4,
        reviews: 89,
        preparationTime: '2-3 min',
        calories: '10 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Ice', 'Cold Water'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'High',
        origin: 'Mixed'
      },
      {
        id: 21,
        name: 'Iced Matcha Latte',
        description: 'Premium matcha powder with milk and ice',
        price: '$5.95',
        rating: 4.8,
        reviews: 178,
        preparationTime: '3-4 min',
        calories: '120 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Matcha Powder', 'Milk', 'Ice', 'Sweetener'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Low',
        origin: 'Japan'
      },
      {
        id: 22,
        name: 'Iced Chai Latte',
        description: 'Spiced chai tea with milk and ice refreshment',
        price: '$5.45',
        rating: 4.7,
        reviews: 156,
        preparationTime: '3-4 min',
        calories: '180 cal',
        image: { uri: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Chai Concentrate', 'Milk', 'Ice', 'Spices'],
        featured: false,
        seasonal: false,
        limited: false,
        caffeine: 'Low',
        origin: 'India'
      }
    ],
    seasonal: [
      {
        id: 23,
        name: 'Pumpkin Spice Delight',
        description: 'Seasonal favorite with pumpkin and warming spices',
        price: '$5.95',
        rating: 4.9,
        reviews: 312,
        preparationTime: '4-5 min',
        calories: '210 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Pumpkin Sauce', 'Steamed Milk', 'Spices'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Mixed'
      },
      {
        id: 24,
        name: 'Peppermint Mocha Dream',
        description: 'Festive blend of chocolate and refreshing peppermint',
        price: '$5.75',
        rating: 4.7,
        reviews: 198,
        preparationTime: '5-6 min',
        calories: '230 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Chocolate', 'Peppermint', 'Whipped Cream'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Mixed'
      },
      {
        id: 25,
        name: 'Maple Pecan Latte',
        description: 'Warm maple and toasted pecan infused latte delight',
        price: '$5.65',
        rating: 4.8,
        reviews: 167,
        preparationTime: '4-5 min',
        calories: '195 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Maple Syrup', 'Pecan', 'Steamed Milk'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Canada'
      },
      {
        id: 26,
        name: 'Cinnamon Roll Latte',
        description: 'Creamy latte with cinnamon and cream cheese foam',
        price: '$5.85',
        rating: 4.9,
        reviews: 223,
        preparationTime: '5-6 min',
        calories: '220 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Cinnamon', 'Cream Cheese Foam', 'Steamed Milk'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Mixed'
      },
      {
        id: 27,
        name: 'Toasted White Chocolate Mocha',
        description: 'Caramelized white chocolate with espresso elegance',
        price: '$6.25',
        rating: 4.8,
        reviews: 178,
        preparationTime: '5-6 min',
        calories: '245 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Toasted White Chocolate', 'Steamed Milk', 'Whipped Cream'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Mixed'
      },
      {
        id: 28,
        name: 'Chestnut Praline Latte',
        description: 'Roasted chestnut and praline infused winter delight',
        price: '$5.95',
        rating: 4.7,
        reviews: 145,
        preparationTime: '4-5 min',
        calories: '215 cal',
        image: { uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop&crop=center' },
        ingredients: ['Espresso', 'Chestnut', 'Praline', 'Steamed Milk'],
        featured: false,
        seasonal: true,
        limited: true,
        caffeine: 'Medium',
        origin: 'Mixed'
      }
    ]
  };

  const categories = [
    { id: 'featured', name: 'Featured', icon: 'star' },
    { id: 'classic', name: 'Classic', icon: 'cafe' },
    { id: 'iced', name: 'Iced', icon: 'snow' },
    { id: 'seasonal', name: 'Seasonal', icon: 'leaf' }
  ];

  // Enhanced add to cart with more animations
  const addToCart = (item: any) => {
    // Complex button press animation
    animatePress(scaleAnim, 0.85);
    setTimeout(() => animatePress(scaleAnim, 1), 200);

    // Enhanced pulse animation
    pulseAnimation(pulseAnim);

    // Cart icon pulse
    Animated.sequence([
      Animated.timing(cartPulse, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(cartPulse, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Show floating cart animation
    setLastAddedItem(item);
    setShowFloatingCart(true);
    floatingCartAnimation(floatAnim);

    // Update cart count
    setCartItemsCount(prev => prev + 1);

    // Hide floating cart after animation
    setTimeout(() => {
      setShowFloatingCart(false);
    }, 2500);

    // Add to cart state
    setCart(prev => {
      const newCart = [...prev, { ...item, timestamp: Date.now() }];
      
      // Enhanced navigation with delay
      setTimeout(() => {
        router.push({
          pathname: '/(tabs)/order',
          params: { addedItem: item.name }
        });
      }, 800);
      
      return newCart;
    });
  };

  // Animation interpolations
  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1.15, 1.1]
  });

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100]
  });

  const parallaxHeader = createParallaxAnimation(scrollY, 0.3);

  // Start shimmer animation on component mount
  useEffect(() => {
    shimmerAnimation(shimmerAnim);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={`star-${i}`} name="star" size={12} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="star-half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons key={`star-empty-${i}`} name="star-outline" size={12} color="#FFD700" />
      );
    }

    return stars;
  };

  const renderCategoryTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryTabsContainer}
      contentContainerStyle={styles.categoryTabsContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryTab,
            activeCategory === category.id && styles.categoryTabActive
          ]}
          onPress={() => setActiveCategory(category.id)}
        >
          <Ionicons 
            name={category.icon as any} 
            size={16} 
            color={activeCategory === category.id ? '#1a1a1a' : '#8B6914'} 
          />
          <Text style={[
            styles.categoryTabText,
            activeCategory === category.id && styles.categoryTabTextActive
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMenuItem = (item: any, index: number) => (
    <View key={item.id} style={styles.menuItemCard}>
      {/* Badges Container */}
      <View style={styles.badgeContainer}>
        {item.featured && (
          <View style={[styles.badge, styles.featuredBadge]}>
            <Ionicons name="star" size={10} color="#1a1a1a" />
            <Text style={styles.badgeText}>FEATURED</Text>
          </View>
        )}
        {item.seasonal && (
          <View style={[styles.badge, styles.seasonalBadge]}>
            <Ionicons name="leaf" size={10} color="#1a1a1a" />
            <Text style={styles.badgeText}>SEASONAL</Text>
          </View>
        )}
        {item.limited && (
          <View style={[styles.badge, styles.limitedBadge]}>
            <Ionicons name="time" size={10} color="#1a1a1a" />
            <Text style={styles.badgeText}>LIMITED</Text>
          </View>
        )}
      </View>

      {/* Item Image with Enhanced Effects */}
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.itemImage}
          resizeMode="cover"
        />
        <Animated.View 
          style={[
            styles.shimmerOverlay,
            {
              transform: [{ translateX: shimmerTranslateX }],
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.3, 0]
              })
            }
          ]}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          style={styles.imageGradient}
        />
        
        {/* Origin Badge */}
        <View style={styles.originBadge}>
          <Ionicons name="location" size={10} color="#8B6914" />
          <Text style={styles.originText}>{item.origin}</Text>
        </View>
      </View>

      {/* Item Content */}
      <View style={styles.itemContent}>
        {/* Header with Name and Rating */}
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>({item.reviews})</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Ingredients Tags */}
        <View style={styles.ingredientsContainer}>
          {item.ingredients.slice(0, 2).map((ingredient: string, idx: number) => (
            <View key={idx} style={styles.ingredientTag}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
          {item.ingredients.length > 2 && (
            <View style={styles.ingredientTag}>
              <Text style={styles.ingredientText}>+{item.ingredients.length - 2}</Text>
            </View>
          )}
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={12} color="#8B6914" />
            <Text style={styles.infoText}>{item.preparationTime}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flame-outline" size={12} color="#8B6914" />
            <Text style={styles.infoText}>{item.calories}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cafe-outline" size={12} color="#8B6914" />
            <Text style={styles.infoText}>{item.caffeine}</Text>
          </View>
        </View>

        {/* Price and Add to Cart */}
        <View style={styles.priceContainer}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
          >
            <Animated.View style={{ transform: [{ scale: cartPulse }] }}>
              <Ionicons name="add" size={16} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        
        {/* Enhanced Floating Cart Animation */}
        {showFloatingCart && (
          <Animated.View style={styles.floatingCart}>
            <BlurView intensity={95} tint="dark" style={styles.floatingCartBlur}>
              <View style={styles.floatingCartContent}>
                <Ionicons name="checkmark-circle" size={24} color="#8B6914" />
                <View style={styles.floatingCartTextContainer}>
                  <Text style={styles.floatingCartTitle}>Added to Cart!</Text>
                  <Text style={styles.floatingCartText}>
                    {lastAddedItem?.name} • {lastAddedItem?.price}
                  </Text>
                </View>
                <View style={styles.cartCounter}>
                  <Text style={styles.cartCounterText}>{cartItemsCount}</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        )}

        <Animated.ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          contentContainerStyle={styles.scrollViewContent}
        >
          
          {/* Enhanced Header Section */}
          <Animated.View style={styles.headerSection}>
            <LinearGradient
              colors={['rgba(26, 26, 26, 0.9)', 'rgba(26, 26, 26, 0.7)']}
              style={styles.headerGradient}
            >
              <Text style={styles.headerSubtitle}>PREMIUM ARTISAN COFFEE</Text>
              <Text style={styles.headerTitle}>BARISTA'S CHOICE</Text>
              <Text style={styles.headerDescription}>
                Handcrafted with precision, served with passion. Each cup tells a story of exceptional quality and artisan craftsmanship.
              </Text>
              
              {/* Stats Row */}
              <View style={styles.headerStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{Object.values(coffeeMenu).flat().length}+</Text>
                  <Text style={styles.statLabel}>Coffee Varieties</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Avg Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>2K+</Text>
                  <Text style={styles.statLabel}>Happy Customers</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Category Tabs */}
          {renderCategoryTabs()}

          {/* 2-COLUMN MENU GRID */}
          <View style={styles.menuSection}>
            <BlurView intensity={90} tint="dark" style={styles.menuBlurContainer}>
              <View style={styles.twoColumnGrid}>
                {coffeeMenu[activeCategory as keyof typeof coffeeMenu].map((item, index) => (
                  <View key={item.id} style={styles.gridItem}>
                    {renderMenuItem(item, index)}
                  </View>
                ))}
              </View>
            </BlurView>
          </View>

          {/* Premium Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Why Choose Our Coffee</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="leaf" size={28} color="#8B6914" />
                </View>
                <Text style={styles.featureTitle}>Organic & Sustainable</Text>
                <Text style={styles.featureDescription}>
                  Ethically sourced from family-owned farms practicing sustainable agriculture
                </Text>
              </View>
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="trophy" size={28} color="#8B6914" />
                </View>
                <Text style={styles.featureTitle}>Award Winning</Text>
                <Text style={styles.featureDescription}>
                  2024 Golden Bean Roaster of the Year with international recognition
                </Text>
              </View>
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="time" size={28} color="#8B6914" />
                </View>
                <Text style={styles.featureTitle}>Fresh Daily Roast</Text>
                <Text style={styles.featureDescription}>
                  Small-batch roasted to order ensuring maximum freshness and flavor
                </Text>
              </View>
            </View>
          </View>

          {/* Loyalty Program Section */}
          <View style={styles.loyaltySection}>
            <LinearGradient
              colors={['#8B6914', '#A47C3C', '#8B6914']}
              style={styles.loyaltyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.loyaltyTitle}>Join Our Loyalty Program</Text>
              <Text style={styles.loyaltyDescription}>
                Earn points with every purchase and unlock exclusive rewards, free drinks, and special member-only offers.
              </Text>
              <TouchableOpacity style={styles.loyaltyButton}>
                <Text style={styles.loyaltyButtonText}>SIGN UP NOW</Text>
                <Ionicons name="arrow-forward" size={18} color="#1a1a1a" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

        </Animated.ScrollView>

        {/* Fixed Cart Button */}
        <TouchableOpacity 
          style={styles.fixedCartButton}
          onPress={() => router.push('/(tabs)/order')}
        >
          <Animated.View style={{ transform: [{ scale: cartPulse }] }}>
            <Ionicons name="cart" size={24} color="#1a1a1a" />
          </Animated.View>
          {cartItemsCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>

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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  // Enhanced Floating Cart Styles
  floatingCart: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#8B6914',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  floatingCartBlur: {
    padding: 15,
    borderRadius: 15,
  },
  floatingCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  floatingCartTextContainer: {
    flex: 1,
  },
  floatingCartTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  floatingCartText: {
    color: '#CCCCCC',
    fontSize: 12,
    fontWeight: '500',
  },
  cartCounter: {
    backgroundColor: '#8B6914',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCounterText: {
    color: '#1a1a1a',
    fontSize: 12,
    fontWeight: '700',
  },
  // Enhanced Header Section
  headerSection: {
    paddingHorizontal: 0,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerGradient: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '300',
    color: '#8B6914',
    letterSpacing: 3,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '200',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 2,
  },
  headerDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
    maxWidth: 300,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '300',
    color: '#8B6914',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: 'rgba(139, 105, 20, 0.3)',
  },
  // Category Tabs
  categoryTabsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryTabsContent: {
    paddingHorizontal: 5,
    gap: 10,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  categoryTabActive: {
    backgroundColor: '#8B6914',
    borderColor: '#8B6914',
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B6914',
  },
  categoryTabTextActive: {
    color: '#1a1a1a',
  },
  // 2-COLUMN GRID STYLES
  menuSection: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  menuBlurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 15,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    width: '48%', // This creates 2 columns with small gap
  },
  menuItemCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 16,
    padding: 0,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
    overflow: 'hidden',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 10,
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 2,
  },
  featuredBadge: {
    backgroundColor: '#8B6914',
  },
  seasonalBadge: {
    backgroundColor: '#2E8B57',
  },
  limitedBadge: {
    backgroundColor: '#FF6B6B',
  },
  badgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-20deg' }],
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  originBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 2,
  },
  originText: {
    fontSize: 7,
    color: '#8B6914',
    fontWeight: '600',
  },
  itemContent: {
    padding: 12,
  },
  itemHeader: {
    marginBottom: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 9,
    color: '#CCCCCC',
    marginLeft: 3,
  },
  itemDescription: {
    fontSize: 11,
    color: '#CCCCCC',
    lineHeight: 14,
    marginBottom: 8,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  ingredientTag: {
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  ingredientText: {
    fontSize: 8,
    color: '#8B6914',
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  infoText: {
    fontSize: 9,
    color: '#8B6914',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B6914',
  },
  addToCartButton: {
    backgroundColor: '#8B6914',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B6914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  // Features Section
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.2)',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 16,
  },
  // Loyalty Section
  loyaltySection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  loyaltyGradient: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#8B6914',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  loyaltyTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  loyaltyDescription: {
    fontSize: 13,
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    opacity: 0.9,
  },
  loyaltyButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  loyaltyButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8B6914',
    letterSpacing: 1,
  },
  // Fixed Cart Button
  fixedCartButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#8B6914',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 100,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B6B',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});