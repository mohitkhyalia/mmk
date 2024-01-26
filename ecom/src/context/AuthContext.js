import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useCart} from './CartContext'


const AuthContext = createContext();
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = false;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isstaff, setIsstaff] = useState(false);
  const [suserData,setSuserData]=useState('');

  const {getcartl} =useCart()
  

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
    
      setIsLoggedIn(true);
      getuser()
    }
    
  }, []);

  function submitUser(e) {
    console.log(e);
    client.post('/api/register/',e).then(function (res) {
      submitlogin(e);
    });
  }

 

  async function getuser(){

  const storedToken = Cookies.get('token');

  if (!storedToken) {
    // Handle the case where the token is not available
    console.error('Token not found in localStorage');
    return;
  }

  try {
    const accessToken = JSON.parse(storedToken).access;

    if (!accessToken) {
      // Handle the case where the access token is not available
      console.error('Access token not found in the parsed token data');
      return;
    }

    console.log(`Bearer ${accessToken}`);


   console.log('cookies', Cookies.get())
    client.get('/api/user/',{ credentials:'include',headers: {
      Authorization: `Bearer ${accessToken}`,
    },})
      .then(function (res) {
        console.log(res)
        if (res.data.is_staff) {
          console.log(res.data.is_staff)
          setIsstaff(res.data.is_staff)
          setSuserData(res.data);
          setIsLoggedIn(true);
          //test123 is staff so it will come under this
        } else {
          console.log(res.data);
          setSuserData(res.data);
          //then also data should be come in get cart 
          setIsLoggedIn(true);
        //getting  data for cart here
          getcartl(res.data.id)
        }
        
      })
      .catch(function (error) {
        submitlogout()
        console.error('Error fetching user data:', error);
        //setSuserData('');
        //setIsLoggedIn(false);
        //window.localStorage.token=''
      });
    } catch (error) {
      // Handle the case where parsing the JSON string fails
      console.error('Error parsing JSON from localStorage:', error);
    }
  }
 

  function submitlogin(e) {
  
    client.post('/api/login/', e,{ maxRedirects: 0 }).then(function (res) {
      
      
      const token = res.data.token;
      Cookies.set('token', JSON.stringify(token));
      setIsLoggedIn(res.data.login);
      getuser()
      
    });
  }

  

  function submitlogout(e) {
    
    client.post('/api/logout/').then(function (res) {
      Cookies.remove('token');
      setIsstaff(false)
      setIsLoggedIn(false);
    });
  }

  const updateislog=(newvalue)=>{
    setIsLoggedIn(newvalue)
  }

  
  return (
    <AuthContext.Provider value={{ isLoggedIn,isstaff,suserData,getuser,submitUser, submitlogin, submitlogout ,updateislog}}>
      {children}
    </AuthContext.Provider>
  );
  }
 