import React ,{ useState,useEffect } from 'react'
import { Link,NavLink,useParams } from "react-router-dom";
import Nav from './Nav';
import { useProductsContext  } from '../context/ApiContext';
import {useCart} from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import { useSaleContext } from '../context/SaleContext';
import Footer from './Footer';


export default function Product({ product }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const { productid } = useParams();
    const { products, loading } = useProductsContext();
   const { suserData} = useAuth();
   const { saleinfo,sale_title,sLoading} = useSaleContext();
   //const { addToCart,addToFav ,updateUserId} = useCart();
  const { cartItems, addToCart, removeFromCart,addToFav } = useCart();


      
    const [asize, setAsize] = useState('');
    // Verify if productData is available
    const pid=parseInt(productid)
    const productt = products?.find((item) => item.id === pid);

   

    if (!productt) {
      return <p>Product not found.</p>;
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
    
    

    const smallImgs = [
          productt.image,
          productt.imageone,
          productt.imagetwo,
          productt.imagethree,
        ];
    
      
    
      const handleSmallImgClick = (index) => {
        setActiveIndex(index);
      };

      
      
    
       

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); setAsize(selectedSize)
  };
      


      const addtocartl =()=>{
        let itemToAdd;
       
          
          itemToAdd = {
            id: productt.id,
            size: asize,
            price: productt.price,
          image:productt.image,
          name:productt.name,
          qty:qty
  
        }
        console.log(suserData.id);
        //supdateUserId(suserData.id);
        addToCart(itemToAdd);
        console.log(itemToAdd);
        alert(`${productt.name} Added to cart`)
        
        }
        
        const addtoFavl =()=>{
          let itemToAdd;
         
            
            itemToAdd = {
              id: productt.id,
              size: asize,
              price: productt.price,
            image:productt.image,
            name:productt.name,
    
          }
          alert(`${productt.name} Added to fav`)
          addToFav(itemToAdd);
          }
        
          const saleprice=productt.price-(productt.price*saleinfo.off)/100 
      

    return(
        <>
         <Nav/>
    
<section className="product-container main">
      
        <div className="img-card">
            <img id="featured-image"
        src={smallImgs[activeIndex]}
        alt="Featured Product" />
        
            <div className="small-Card">
            {smallImgs.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Small Product ${index}`}
            className={`small-Img ${index === activeIndex ? 'sm-card' : ''}`}
            onClick={() => handleSmallImgClick(index)}
          />))}
                </div>
        </div>
      
        <div className="product-info">
            <h3>{productt.name}</h3>
            {saleinfo && productt.sale ? (<><h4 style={{ margin: 0 }}>On sale Discount</h4>
            <h5>Price: <del style={{ textDecoration: 'line-through' }}>{productt.price}</del> 
            <span >{saleprice}</span></h5></>) : (<> <h5>Price: <del>{productt.price}</del> </h5></>)}

            <p>{productt.dec}</p>
            
            <div className="sizes">
                <p>Size:</p>
                <select name="Size" id="size" className="size-option" value={selectedSize}onChange={handleSizeChange}>
                    <option value="xxl">XXL</option>
                    <option value="xl">XL</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                </select>
                
            </div>

            <div className="quantity">
                <input  type="number"value={qty} onChange={(e) => setQty(e.target.value)}/><button onClick={addtocartl}>Add to Cart</button>
                
            </div>

            
        </div>
    </section>



<Footer/>

        </>
    )
}