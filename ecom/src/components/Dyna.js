import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from './Nav';
import { useProductsContext } from '../context/ApiContext';
import { useCart } from '../context/CartContext';
import Footer from './Footer';

export default function Dyna() {
  const { productcato } = useParams();
  const { addToFav } = useCart();
  const [searchInput, setSearchInput] = useState('');
  const { products, loading } = useProductsContext();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  useEffect(() => {
    // Filter products based on search input
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchSuggestions(filteredProducts);
  }, [searchInput, products]);


  if (loading) {
    return (
      <div className="lor-layout">
        <div className="lor-header"></div>
        <div className="lor-main">
          <span className="loader">Loading</span>
        </div>
        <div className="lor-footer"></div>
      </div>
    );
  }

  const dproduct = products.filter((product) => product.cato === productcato);
  const addtoFavl =(dp)=>{
    let itemToAdd;
   
      
      itemToAdd = {
        id: dp.id,
        price: dp.price,
      image:dp.image,
      name:dp.name,

    }
    console.log(itemToAdd);
    alert(`${dp.name} Added to fav`)
    addToFav(itemToAdd);
    }

    console.log(searchSuggestions);
  return (
    <>
      <Nav />

      <div className="main">
        <div className="serch-box">
         <input
            className="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput?(<div className=' ser_data'>
            {searchSuggestions.map((items)=>(
            <Link to={{pathname: `/d/${items.cato}`}}><p className='' key={items.id}>{items.name}</p></Link>
            ))}
          </div>):(<></>)}
         
              
        </div>
        
        <div className="ad-space">
          {dproduct.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            dproduct.map((product) => (
              
              <div className="card" key={product.id}>
                <Link   className='fav-btn icon-btn' onClick={() => {  addtoFavl(product); }}><span className="material-symbols-outlined">favorite</span></Link>
                <div className="card-content">
                  <img src={product.image} alt="Product Image" />
                </div>
                <Link
                  className="btn"
                  to={{
                    pathname: `/product/${product.id}`,
                    state: { productData: product },
                  }}
                >
                  Shop
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
