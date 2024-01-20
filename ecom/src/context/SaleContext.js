import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


const SaleContext = createContext();
const AuthContext = createContext();
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = false;

export function useSaleContext() {
  return useContext(SaleContext);
}

export function SaleProvider({ children }) {


    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000',
      });
    const [saleinfo,setSaleinfo]=useState('')
    const [sLoading, setSLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [sale_data,setSale_data]=useState()
    const [sale_title,setSale_title]=useState()
    const storedToken = Cookies.get('token');
    const intervalId = setInterval(() => {
        setCurrentDate(new Date());
      });
      const formattedDate = currentDate.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    function sale() {
        client.get('/api/sale/',).then(function(res){
          console.log(res.data)
          setSale_data(res.data)
          const sale_dat = res.data.find((e) =>e.start_date === formattedDate);
          if (sale_dat) {
            console.log(sale_dat);
          setSaleinfo(sale_dat)
          setSale_title(sale_dat.name)
          } else {
            const sale_data = res.data.find((e) => {
              // Assuming e.start_date is a string representing a date in "YYYY-MM-DD" format
              const saleDate = new Date(e.end_date);
              const targetDate = new Date(formattedDate);
            
              // Compare dates to find elements with start_date before formattedDate
              return saleDate < targetDate;
              
            });
            console.log(sale_data.name);
            setSaleinfo(sale_data)
            setSale_title(sale_data.name)
          }
          
        }).then(function(res){
            
            //
            //setSale_title(sale_dat.name)
        })
        console.log(saleinfo)
      }
  
  


  

  function salepsot(a) {
    const storedToken = Cookies.get('token');
    const accessToken = JSON.parse(storedToken).access;
    client.post('/api/sale/',a,{ credentials:'include',headers: {
      Authorization: `Bearer ${accessToken}`,
    },}).then(function(res){
      console.log(res)
    })
  }


  
  function salepatcht(a) {
    const storedToken = Cookies.get('token');
    const accessToken = JSON.parse(storedToken).access;
    client.patch('/api/sale/',a,{ credentials:'include',headers: {
      Authorization: `Bearer ${accessToken}`,
    },}).then(function(res){
      console.log(res)
    })
  }

  function saledeletet(a) {
    console.log('=====>a',a);
    client.delete('/api/sale/',a).then(function(res){
      console.log(res)
    })
  }
  
  useEffect(() => {
    
    sale()
      
   }, []);

   
   

   
  const value = { sale_data,saleinfo,sLoading,sale,saledeletet,salepsot,sale_title,salepatcht};


  return <SaleContext.Provider value={value}>{children}</SaleContext.Provider>;
}
