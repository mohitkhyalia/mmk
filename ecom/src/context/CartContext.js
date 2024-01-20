import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create a context for the cart
const CartContext = createContext();

// Create a CartProvider component to manage the cart state
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const { suserData } = useAuth();
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });
  
  useEffect(() => {
    if(suserData.id){
      getcart()
    }
    
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    patchcart(); getcart()
    // Pass the updated cartItems to patchcart
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCart);
    patchcart();getcart()
  };

  function getcart() {
    const user_id = suserData.id;
    client.get(`/api/getcart/?user_id=${user_id}`).then(function (res) {
      console.log(res);
      setCartItems(res.data.items)
    });
  }

  function patchcart() {
    const user_id = suserData.id;
    const cartData = {
      user_id: user_id,
      items: cartItems,
    };

    client.post(`/api/getcart/?user_id=${user_id}`, cartData).then(function (res) {
      console.log(res);
      getcart()
    });
  }

  return (
    <CartContext.Provider value={{ cartItems,getItems, addToCart, removeFromCart, getcart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context in components
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
export { CartProvider, useCart };