import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Nav from './Nav';
import { useProductsContext  } from '../context/ApiContext';
import {useCart} from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import { useSaleContext } from '../context/SaleContext';

export default function Sale() {

    /************api */
    const [searchInput, setSearchInput] = useState('');
    const { products, loading } = useProductsContext();
    const { addToFav } = useCart();
    const { saleinfo,sale_title,sLoading} = useSaleContext();
    
  
    
     /* sale data*/
     useEffect(() => {
      
    },[])
    
    // Run the fetchData function once when the component mounts
  // Empty dependency array means the effect runs once on mount
    

 
  if (!sale_title) {

    // Handle the case where saleinfo is not available yet
    return (
      <>
      <section className="lor-layout">
<div className="lor-header"></div>
<div className="lor-main"><span className="loader">Loading</span></div>
<div className="lor-footer"></div>
</section></>)
    
  }
  
 
      
      

 

 
 
  
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

    const filteredProducts = products.filter((product) =>product.sale === true);
    
    

      

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
        addToFav(itemToAdd);
        }

       

    return(
        <>
        <Nav/>

    <div className="main">

    {saleinfo?(<>
        <div className='serch-box'>
          
        <h1 >{sale_title} </h1>
        <p>sale was started on {saleinfo.start_date.slice(-2)}th and will end on {saleinfo.end_date.slice(-2)}th</p>
        </div>
        
        <div className='ad-space'>
        {filteredProducts.map((product) => (
            <div className='card' key={product.id}>
                <div className='card-content'>
                <Link   className='fav-btn icon-btn' onClick={() => {  addtoFavl(product); }}><span className="material-symbols-outlined">favorite</span></Link>
                    <img src={product.image} alt='Product Image'/>
                    
                </div>
                <Link className='btn' to={{
    pathname: `/product/${product.id}`,
    state: { productData: product }
  }}>Shop</Link>
            </div> ))}
            

            
        </div></>):(<><h1 >Next Sale On It's Way</h1>
        <p>Currently Nothing is on sale </p></>)}
        
    </div>
        </>
    )
}


