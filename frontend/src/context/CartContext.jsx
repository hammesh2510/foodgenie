import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  
  const addToCart = (item, rId) => {
    // If adding item from a different restaurant, clear cart
    if (restaurantId && restaurantId !== rId) {
      if (window.confirm("Adding this item will clear your cart from the previous restaurant. Continue?")) {
        setCartItems([{ ...item, quantity: 1 }]);
        setRestaurantId(rId);
      }
      return;
    }
    
    if (!restaurantId) {
      setRestaurantId(rId);
    }

    setCartItems(prev => {
      const existingItem = prev.find(i => i._id === item._id);
      if (existingItem) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const newItems = prev.filter(i => i._id !== itemId);
      if (newItems.length === 0) setRestaurantId(null);
      return newItems;
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => {
      return prev.map(i => {
        if (i._id === itemId) {
          const newQ = i.quantity + delta;
          return { ...i, quantity: newQ > 0 ? newQ : 1 };
        }
        return i;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      restaurantId,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
