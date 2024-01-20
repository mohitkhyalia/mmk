import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


const CopnContext = createContext();

export function useCopnContext() {
  return useContext(CopnContext);
}

export function CopnProvider({ children }) {
  const [couponData, setCouponData] = useState([]);
  const [headerVal,setHeaderVal]=useState({})

  
  useEffect(() => {
    const storedToken = Cookies.get('token');
    
    if(storedToken){
      const accessToken = JSON.parse(storedToken);
      fetch('http://127.0.0.1:8000/api/coupon/',{headers: {
      Authorization: `Bearer ${(accessToken).access}`},})
      .then((response) => response.json())
      .then((data) => {
        setCouponData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });}
    // Fetch data from the API when the component mounts
    
      

     
  }, []);
  console.log(couponData);
  const value = { couponData };

  return <CopnContext.Provider value={value}>{children}</CopnContext.Provider>;
}
