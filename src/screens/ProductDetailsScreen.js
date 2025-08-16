import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { useProducts } from '../store/ProductContext';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mockReviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      comment: 'Amazing product! Highly recommended.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Emily R.',
      rating: 4,
      comment: 'Good quality and fast delivery.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Jessica L.',
      rating: 5,
      comment: 'Love it! Will definitely buy again.',
      date: '2 weeks ago'
    }
  ];

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.thumbnail];

  const handleAddToBag = () => {
    addToCart(product);
    Alert.alert(
      'Added to Bag',
      `${product.title} has been added to your bag!`,
      [{ text: 'OK' }]
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
      );
    }

    return stars;
  };

  const renderReview = (review) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewName}>{review.name}</Text>
        <View style={styles.reviewRating}>
          {renderStars(review.rating)}
        </View>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  const renderHighlight = (title, value) => (
    <View style={styles.highlightItem}>
      <Text style={styles.highlightTitle}>{title}</Text>
      <Text style={styles.highlightValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#FF69B4" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {productImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          {productImages.length > 1 && (
            <View style={styles.imageIndicators}>
              {productImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentImageIndex === index && styles.activeIndicator
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productBrand}>{product.brand || 'GlowCart'}</Text>
          
          {/* Rating and Price */}
          <View style={styles.ratingPriceContainer}>
            <View style={styles.ratingContainer}>
              {renderStars(product.rating || 4.5)}
              <Text style={styles.ratingText}>
                {product.rating || 4.5} ({mockReviews.length} reviews)
              </Text>
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Highlights */}
          <Text style={styles.sectionTitle}>Product Highlights</Text>
          <View style={styles.highlightsContainer}>
            {renderHighlight('Dimensions', product.dimensions ? 
              `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` : 
              '15 × 10 × 5 cm')}
            {renderHighlight('Warranty', product.warrantyInformation || '1 Year Warranty')}
            {renderHighlight('Shipping', product.shippingInformation || 'Free shipping on orders over $50')}
            {renderHighlight('Return Policy', product.returnPolicy || '30-day return policy')}
          </View>

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
          <View style={styles.reviewsContainer}>
            {mockReviews.map(renderReview)}
          </View>
        </View>
      </ScrollView>

      {/* Add to Bag Button */}
      <View style={styles.footer}>
        <CustomButton
          title="Add to Bag"
          onPress={handleAddToBag}
          style={styles.addToBagButton}
          textStyle={styles.addToBagText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  favoriteButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 16,
    color: '#FF69B4',
    fontWeight: '600',
    marginBottom: 15,
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  highlightsContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
  },
  highlightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  highlightValue: {
    fontSize: 14,
    color: '#666666',
    flex: 2,
    textAlign: 'right',
  },
  reviewsContainer: {
    marginTop: 10,
  },
  reviewItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginRight: 10,
  },
  reviewRating: {
    flexDirection: 'row',
    marginRight: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 'auto',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addToBagButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 25,
    paddingVertical: 16,
  },
  addToBagText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ProductDetailsScreen;