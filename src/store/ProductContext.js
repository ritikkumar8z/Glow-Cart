import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cosmeticProducts, setCosmeticProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data.products);
      
      // Filter cosmetic products based on title, description
      const cosmetics = data.products.filter(product => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.toLowerCase();
        
        return (
          title.includes('mascara') ||
          title.includes('lipstick') ||
          title.includes('perfume') ||
          title.includes('beauty') ||
          title.includes('makeup') ||
          title.includes('cream') ||
          title.includes('serum') ||
          title.includes('essence') ||
          description.includes('skin') ||
          description.includes('beauty') ||
          description.includes('cosmetic') ||
          category.includes('beauty') ||
          category.includes('fragrances')
        );
      });
      
      setCosmeticProducts(cosmetics);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const getFilteredProducts = () => {
    if (!searchQuery) return cosmeticProducts;
    
    return cosmeticProducts.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const value = {
    products,
    cosmeticProducts,
    loading,
    cart,
    searchQuery,
    setSearchQuery,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getFilteredProducts,
    refreshProducts: loadProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};