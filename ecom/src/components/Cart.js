import React ,{ useState,useEffect } from 'react'
import { Link,useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Nav from './Nav';
import { useAuth } from '../context/AuthContext';
import {useCart} from '../context/CartContext'
import { useCopnContext  } from '../context/Copn';
import axios from 'axios';
import Footer from './Footer';

export default function Cart(props) {
  const { isLoggedIn ,logout,suserData} = useAuth();
 // const { cartdata,removeFromCart, clearCart ,user_id, addToCart, get_cart} = useCart();
 const { cartItems, addToCart,cartItems_todisplay, removeFromCart ,getItems} = useCart();
  const { couponData} = useCopnContext();
 const [subtotal, setSubtotal] = useState(0);
 const [qty,setQty]=useState(1)
  const taxRate = 0.05; // 5% tax rate
  const shippingFee = 15;
  const [couponInput, setCouponInput] = useState(''); // Note the corrected variable name
  const [appliedCoupon, setAppliedCoupon] = useState(null); 
  console.log(cartItems_todisplay)
  //get_cart();
      
      const applyCoupon = () => {
        console.log(couponData);
        
        const coupon =couponData?.find((item) => item.code === couponInput);
        console.log(coupon);
        if (coupon.vallidon) {
          
          const subs=(subtotal*coupon.off)/100

          setAppliedCoupon(subs)
          
          alert(`${couponInput} Applied secussfully${appliedCoupon}`)
          //setAppliedCoupon(subs);
        } else {
          // Handle invalid coupon code
          alert('Invalid coupon code');
        }
      }

     
     
      const removeCart =(e)=>{
        let itemToRemove;
       
          
        itemToRemove = {
            id: e.id,
          name:e.name,
        }
        //supdateUserId(suserData.id);
        removeFromCart(itemToRemove);
        console.log(itemToRemove);
        alert(`${e.name} removed from cart`)
        
        }
  

  // Calculate the subtotal when the cart or item quantities change
  useEffect(() => {
    // Function to refresh data
    const fetchData = () => {
      // Your data fetching logic here
      console.log('Data refreshed!',cartItems_todisplay.items);
    };

    // Refresh data three times in the first 30 seconds
   /* for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        fetchData();
      }, i * 1000); // 10 seconds interval
    }*/
  }, []);

  // Calculate the tax and grand total
  const tax = subtotal * taxRate;
  const grandTotal = subtotal  + shippingFee-appliedCoupon;
  
  /*cupon
  if(!cartdata){
    return <h1>Empty Cart</h1>
 }
     
  /*if(isLoggedIn){
    Cookies.set('userCart', JSON.stringify(Cart));
  }*/
  /*if (isLoggedIn) {
    const storedCart = Cookies.get('userCart');
    if (storedCart) {
      const userCart = JSON.parse(storedCart);
      // Set the userCart state or handle it as needed in your application
    }this is empty
  }*/
  const handleQtyChange = (event) => {
    setQty(event.target.value); 
  };
    return(<>
    <Nav/>
            
    

               


            <div className='main'>
            <h1>Shopping Cart</h1>

<div className="shopping-cart">
  {Array.isArray(cartItems_todisplay) && cartItems_todisplay.length > 0 ?(<>{cartItems_todisplay.map((item, index) => (<>
  <div className="column-labels">
    <label className="product-image">Image</label>
    <label className="product-details">Product</label>
    <label className="product-price">Price</label>
    <label className="product-quantity">Quantity</label>
    <label className="product-removal">Remove</label>
    <label className="product-line-price">Total</label>
  </div>

  <div className="product" key={index} >
    <div className="product-image">
      <img src={item.image}/>
    </div>
    <div className="product-details">
      <div className="product-title">{item.name}</div>
      <p className="product-description">{item.dec}</p>
    </div>
    <div className="product-price">{item.price}</div>
    <div className="product-quantity">
     <input type='number'  value={qty}onChange={handleQtyChange}/>
    </div>
    <div className="product-removal">
      <button className="remove-product" onClick={() => removeCart(item)}>
        Remove
      </button>
    </div>
    <div className="product-line-price">{item.price * qty }</div>{console.log('qty',qty)}
  </div></>
))}</>):(<>Let's add some</>)}

  
  
  <div className="totals">
    <div className="totals-item">
      <label>Subtotal</label>
      <div className="totals-value" id="cart-subtotal">{subtotal.toFixed(2)}</div>
    </div>
    {/*<div className="totals-item">
      <label>Tax (5%)</label>
      <div className="totals-value" id="cart-tax">{tax.toFixed(2)}</div>
</div>*/}
    <div className="totals-item">
      <label>Shipping</label>
      <div className="totals-value" id="cart-shipping">+{shippingFee.toFixed(2)}</div>
    </div>
    {appliedCoupon?(<div className="totals-item">
      <label>Discount</label>
      <div className="totals-value" id="cart-shipping">-{appliedCoupon}</div>
    </div>):(<></>)}
    <div className="totals-item totals-item-total">
      <label>Grand Total</label>
      <div className="totals-value" id="cart-total">{grandTotal.toFixed(2)}</div>
      
    </div>
    
  </div>
  <div className='cupon-box'>
                <input className='cupon' value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder='Cupon Code' /><Link onClick={applyCoupon} className='icon-btn'>Apply</Link>
  </div>
  <button className="checkout">Checkout</button>

</div>
            </div>
            <Footer/>
           </>)}

