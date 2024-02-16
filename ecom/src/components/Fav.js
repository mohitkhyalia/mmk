import React ,{ useState,useEffect } from 'react'
import { Link,useParams } from "react-router-dom";
import Nav from './Nav';
import {useFav} from '../context/FavContext'

export default function Fav() {
  const { favItems_todisplay, removeFromfav }  = useFav();
    
  useEffect(() => {
    // Function to refresh data
    const fetchData = () => {
      // Your data fetching logic here
      console.log('Data refreshed!',favItems_todisplay.items);
    };fetchData()
  }, []);
    
    console.log(favItems_todisplay);
    return(<>
        <Nav/>
        <div className='main'>
            <button >Clear all</button>
            <div className='ad-space'>
            {Array.isArray(favItems_todisplay) && favItems_todisplay.length > 0 ?(<>{favItems_todisplay.map((item, index) => (<>
                
                    <div className="card" key={index}>
                <Link   className='fav-btn icon-btn' onClick={() => removeFromfav(item)}><span className="material-symbols-outlined">favorite</span></Link>
                <div className="card-content">
                  <img src={item.image} alt="Product Image" />
                </div>
                <Link
                  className="btn"
                  to={{
                    pathname: `/product/${item.id}`,
                    state: { productData: item },
                  }}
                >
                  Shop
                </Link>
              </div></>))}</>):(<>Let's add some</>)}
            </div>
        </div>
        </>
    )
}