import React ,{ useState,useEffect } from 'react'
import { Link,useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Nav from './Nav';
import { useAuth } from '../context/AuthContext';
import {useCart} from '../context/CartContext'
import { useCopnContext  } from '../context/Copn';
import axios from 'axios';

export default function Cart(props) {
  const { isLoggedIn ,logout,suserData} = useAuth();
 // const { cartdata,removeFromCart, clearCart ,user_id, addToCart, get_cart} = useCart();
 const { cartItems, addToCart,getcart, removeFromCart ,getItems} = useCart();
  const { couponData} = useCopnContext();
 const [subtotal, setSubtotal] = useState(0);
  const taxRate = 0.05; // 5% tax rate
  const shippingFee = 15;
  const [couponInput, setCouponInput] = useState(''); // Note the corrected variable name
  const [appliedCoupon, setAppliedCoupon] = useState(null); 
  console.log(cartItems)
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

     
     
    
    

  // Calculate the subtotal when the cart or item quantities change
  useEffect(() => {
    /*let newSubtotal = 0;
    for (const item of cartdata) {
      newSubtotal += item.price * item.qty;
    }
    setSubtotal(newSubtotal);*/
    
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
  
console.log(getItems)

    return(<>
    <Nav/>
            
    

               


            <div className='main'>
            <h1>Shopping Cart</h1>

<div className="shopping-cart">
  {Array.isArray(cartItems) && cartItems.length > 0 ?(<>{cartItems.map((item, index) => (<>
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
    {item.qty} 
    </div>
    <div className="product-removal">
      <button className="remove-product" onClick={() => removeFromCart(item)}>
        Remove
      </button>
    </div>
    <div className="product-line-price">{item.price * item.qty }</div>{console.log('qty',item.qty)}
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
           </>)}

