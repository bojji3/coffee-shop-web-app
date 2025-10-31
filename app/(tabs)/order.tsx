import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [scaleAnim] = useState(new Animated.Value(1));
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: 'Caramel Macchiato',
      price: 5.25,
      quantity: 1,
      customizations: ['Extra Shot', 'Less Sweet']
    },
    {
      id: 2,
      name: 'Iced Latte',
      price: 4.75,
      quantity: 2,
      customizations: ['Oat Milk']
    }
  ]);

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'Coffee Lover',
    address: '123 Coffee Street, Brew City',
    phone: '(555) 123-4567',
    instructions: 'Leave at door please'
  });

  const animatePress = (scaleValue: number) => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      useNativeDriver: true,
    }).start();
  };

  const updateQuantity = (id: number, change: number) => {
    setOrderItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    animatePress(0.9);
    setTimeout(() => {
      animatePress(1);
      setOrderItems(prev => prev.filter(item => item.id !== id));
      if (orderItems.length === 1) {
        Alert.alert("Cart Empty", "Your cart is now empty");
        setTimeout(() => router.back(), 1000);
      }
    }, 150);
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    animatePress(0.95);
    setTimeout(() => {
      animatePress(1);
      Alert.alert(
        "🎉 Order Confirmed!",
        `Your order totaling $${calculateTotal().toFixed(2)} has been placed successfully!\n\nEstimated delivery: 20-30 minutes`,
        [
          { 
            text: "Track Order", 
            onPress: () => router.push('/(tabs)/profile'),
            style: "default"
          },
          { 
            text: "Continue Shopping", 
            onPress: () => router.push('/(tabs)/menu')
          }
        ]
      );
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.heroSection}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.heroSubtitle}>COMPLETE YOUR ORDER</Text>
          <Text style={styles.heroTitle}>Order Summary</Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          {orderItems.map((item) => (
            <View key={item.id} style={styles.orderItemCard}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color="#e53e3e" />
                </TouchableOpacity>
              </View>

              {item.customizations.length > 0 && (
                <View style={styles.customizations}>
                  <Text style={styles.customizationsLabel}>Customizations:</Text>
                  {item.customizations.map((custom, index) => (
                    <Text key={index} style={styles.customizationText}>• {custom}</Text>
                  ))}
                </View>
              )}

              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="remove" size={16} color="#8B6914" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={16} color="#8B6914" />
                </TouchableOpacity>
                <Text style={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.deliveryCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#8B6914" />
              <Text style={styles.infoText}>{deliveryInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#8B6914" />
              <Text style={styles.infoText}>{deliveryInfo.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} color="#8B6914" />
              <Text style={styles.infoText}>{deliveryInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="document-text" size={20} color="#8B6914" />
              <Text style={styles.infoText}>{deliveryInfo.instructions}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Text style={styles.editButtonText}>Edit Information</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${calculateTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$2.50</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>$1.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${(calculateTotal() + 3.50).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Checkout Button */}
        <View style={styles.checkoutSection}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              activeOpacity={0.8}
            >
              <Ionicons name="card" size={24} color="#1a1a1a" />
              <Text style={styles.checkoutButtonText}>
                Checkout - ${(calculateTotal() + 3.50).toFixed(2)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => router.push('/(tabs)/menu')}
            activeOpacity={0.7}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
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
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
    backgroundColor: 'rgba(139, 105, 20, 0.2)',
    borderRadius: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8B6914',
    letterSpacing: 3,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  section: {
    padding: 30,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: 1,
  },
  orderItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '300',
    color: '#8B6914',
  },
  removeButton: {
    padding: 4,
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    borderRadius: 8,
  },
  customizations: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  customizationsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  customizationText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 105, 20, 0.3)',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#EEE6DD',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 105, 20, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B6914',
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#8B6914',
    marginVertical: 16,
    opacity: 0.3,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '300',
    color: '#8B6914',
  },
  checkoutSection: {
    padding: 30,
    paddingTop: 20,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B6914',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#8B6914',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    gap: 12,
    marginBottom: 16,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  continueShoppingButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  continueShoppingText: {
    fontSize: 16,
    color: '#8B6914',
    fontWeight: '500',
  },
});