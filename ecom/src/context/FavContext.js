import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
//import { useAuth } from './AuthContext';

// Create a context for the fav
const FavContext = createContext();

// Create a FavProvider component to manage the fav state
const FavProvider = ({ children }) => {
  var favItems_toadd=[];
  const [favItems_todisplay, set_favItems] = useState([]);
  const [id, setid] = useState();
  //const { suserData } = useAuth();
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });
  
  useEffect(() => {
    
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        
          //getfav()
        
      }, i * 1000); // 10 seconds interval
    }
  }, []);

  const addTofav = (item) => {
    patchfav(item); 
    // Pass the updated favItems to patchfav
  };

  const removeFromfav = (item) => {
    deletefav(item);getfav(id)
  };

  function getfav(e) {
    
    client.get(`/api/getfav/?user_id=${id}`).then(function (res) {
      console.log(res);
      set_favItems(res.data.items)
      //setfavItems(res.data.items)
    });
  }

  function getfavl(e) {
    if(e){setid(e)
    
    client.get(`/api/getfav/?user_id=${e}`).then(function (res) {
      console.log(res);
      set_favItems(res.data.items)
      //setfavItems(res.data.items)
    });}
  }

  function deletefav(e){
    console.log(e)
    client.patch(`/api/getfav/?user_id=${id}`, e).then(function (res) {
      console.log(res)
      set_favItems()
      
    })
  }
  function patchfav(item) {
    console.log(id)
    const favData = {
      user_id: id,
      items: item,
    };
    console.log(favData)

    client.post(`/api/getfav/?user_id=${id}`, favData).then(function (res) {
      
      console.log(res);
      console.log(res.data.items)
      getfav()
    });
  }

  return (
    <FavContext.Provider value={{ favItems_todisplay, addTofav, removeFromfav, getfav ,getfavl}}>
      {children}
    </FavContext.Provider>
  );
};

// Create a custom hook to use the fav context in components
const useFav = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error('usefav must be used within a FavProvider');
  }
  return context;
};
export { FavProvider, useFav };