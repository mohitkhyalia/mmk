import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
//import { useAuth } from './AuthContext';

// Create a context for the cart
const CartContext = createContext();

// Create a CartProvider component to manage the cart state
const CartProvider = ({ children }) => {
  var cartItems_toadd=[];
  const [cartItems_todisplay, set_cartItems] = useState([]);
  const [id, setid] = useState();
  //const { suserData } = useAuth();
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });
  
  useEffect(() => {
    
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        
          //getcart()
        
      }, i * 1000); // 10 seconds interval
    }
  }, []);

  const addToCart = (item) => {
    patchcart(item); getcart()
    // Pass the updated cartItems to patchcart
  };

  const removeFromCart = (item) => {
    deletecart(item);getcart(id)
  };

  function getcart(e) {
    
    client.get(`/api/getcart/?user_id=${id}`).then(function (res) {
      console.log(res);
      set_cartItems(res.data.items.items)
      //setCartItems(res.data.items)
    });
  }

  function getcartl(e) {
    if(e){setid(e)
    
    client.get(`/api/getcart/?user_id=${e}`).then(function (res) {
      console.log(res);
      set_cartItems(res.data.items.items)
      //setCartItems(res.data.items)
    });}
  }

  function deletecart(e){
    console.log(e)
    client.patch(`/api/getcart/?user_id=${id}`, e).then(function (res) {
      console.log(res)
      set_cartItems()
      
    })
  }
  function patchcart(item) {
    console.log(id)
    const cartData = {
      user_id: id,
      items: item,
    };
    console.log(cartData)

    client.post(`/api/getcart/?user_id=${id}`, cartData).then(function (res) {
      
      console.log(res);
      getcart()
    });
  }

  return (
    <CartContext.Provider value={{ cartItems_todisplay, addToCart, removeFromCart, getcart ,getcartl}}>
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