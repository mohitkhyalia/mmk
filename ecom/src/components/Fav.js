import React ,{ useState,useEffect } from 'react'
import { Link,useParams } from "react-router-dom";
import Nav from './Nav';
import { useAuth } from '../context/AuthContext';
import {useCart} from '../context/CartContext'

export default function Fav() {
    const { addToCart,fav, removeFromFav, clearFav } = useCart();
    
    
    
    console.log(fav);
    return(<>
        <Nav/>
        <div className='main'>
            <button onClick={() => clearFav()}>Clear all</button>
            <div className='ad-space'>
                {fav.map((item, index) => (<>
                
                    <div className="card" key={index}>
                <Link   className='fav-btn icon-btn' onClick={() => removeFromFav(item)}><span className="material-symbols-outlined">favorite</span></Link>
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
              </div></>))}
            </div>
        </div>
        </>
    )
}