import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Nav from './Nav';
import { useProductsContext  } from '../context/ApiContext';
import {useFav} from '../context/FavContext'
import Footer from './Footer';

export default function Index() {
    const { products, loading } = useProductsContext();
    const { addTofav } = useFav();
    /************api */
    const [searchInput, setSearchInput] = useState('');
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
        <>
        <section className="lor-layout">
  <div className="lor-header"></div>
  <div className="lor-main"><span className="loader">Loading</span></div>
  <div className="lor-footer"></div>
</section></>)
      }


      

    /*********end api */

    /****Search function */

    const filteredProducts = products.filter((product) => {
        // Apply the search filter
        const productName = product.name.toLowerCase();
    
        return searchInput === '' || productName.indexOf(searchInput.toLowerCase()) !== -1;
      });

    /*****end search */
      
    
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
    addTofav(itemToAdd);
    }
  

    return(
        <>
        <Nav/>

    <div className="main">

       
        <div className='serch-box'>
        <input className='search'placeholder='Search' /* from search*/value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}/**end**/ />
          {searchInput?(<div className=' ser_data'>
            {searchSuggestions.map((items)=>(
            <Link to={{pathname: `/d/${items.cato}`}}><p className='' key={items.id}>{items.name}</p></Link>
            ))}
          </div>):(<></>)}
        </div>
        <div className='ad-space'>
        {filteredProducts.map((product) => (
            <div className='card' key={product.id}>
                <Link   className='fav-btn icon-btn' onClick={() => {  addtoFavl(product); }}><span className="material-symbols-outlined">favorite</span></Link>
                <div className='card-content'>
                    <img src={product.image} alt='Product Image'/>
                    
                </div>
                <Link className='btn' to={{
    pathname: `/product/${product.id}`,
    state: { productData: product }
  }}>Shop</Link>
            </div> ))}
            

           
        </div>
        
    </div>
    <Footer/>
        </>
    )
}


