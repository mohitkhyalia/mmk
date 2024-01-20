import React, { createContext, useContext, useState, useEffect } from 'react';



const ProductsContext = createContext();

export function useProductsContext() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://127.0.0.1:8000/api/product/');
      const data = await response.json();

      setProducts(data);
      setLoading(false);

      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);

      // Reject with the error
      throw error;
    }
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchProducts();
  }, []);

  const value = { products, loading, fetchProducts };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

