import React ,{ useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { useProductsContext } from '../context/ApiContext';
import Footer from './Footer';

export default function Home()  {
  
    const { products, loading } = useProductsContext();
    const [slideIndex, setSlideIndex] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
          }, 2000);
      
          return () => clearInterval(interval);
        }, []);
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
        const slides = [
          {
            id: 1,
            img: 'https://www.libas.in/cdn/shop/files/desktop-banner_1_1d2adb9a-26d4-41db-87a8-f0e253942888_1500x.jpg?v=1704855285',
            caption: 'Caption Text',
          },
          {
            id: 2,
            img: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
            caption: 'Caption Two',
          },
          {
            id: 3,
            img: 'https://www.libas.in/cdn/shop/files/desktop-banner_1_1d2adb9a-26d4-41db-87a8-f0e253942888_1500x.jpg?v=1704855285',
            caption: 'Caption Three',
          },
        ];


    const dproduct = products.filter((product) => product.featured === true);
    

    return(
        <>
        <div className='nav'>
                 
            <div className='container'>
                <div>
                    <img src='logo1.jpg' style={{height :'5vh' , width : '5vh',borderRadius:'12px'}} alt='Logo'/>
                </div>
            
                <div >
                        <Link to='/profile' className='icon-btn'><span className="material-symbols-outlined">person</span></Link><Link to='/fav' className='icon-btn'><span className="material-symbols-outlined">favorite</span></Link><Link to='/cart' className='icon-btn'><span className="material-symbols-outlined">shopping_cart</span></Link>
                </div>
            </div>
            <div className='main-cols'>
            <Link to='/n'>New Arrivals</Link><Link to='/sale'>Sale</Link><Link to='https://wa.me/919176782798'>Talk to Tailor</Link>
            </div>
        </div>
        <div className="slideshow-container">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={` fade ${slide.id === slideIndex + 1 ? 'active' : 'mySlides'}`}
        >
          <div className="numbertext">{slide.id} / 3</div>
          <img src={slide.img} style={{ width: '100%' }} alt="" />
        </div>
      ))}</div>
      <section>
     
        
    <div class="home-container">
        <div class="home-card">
        <span class="material-symbols-outlined">
            workspace_premium
        </span>
            <p>Premium Quality</p>
        </div>
        <div class="home-card" style={{borderLeft: '1px solid #00000059',borderRight: '1px solid #00000059'}}>
            
        <span class="material-symbols-outlined">
            phonelink_lock
        </span>
            <p>Secure Payment</p>
           
        </div>
        <div class="home-card">
        <span class="material-symbols-outlined">
            local_shipping
        </span>
            
            <p>Free Shipping</p>
        </div>
    </div>

      </section>
    

    <section>
    <h1 style={{fontWeight :'bold',fontSize:'42px',margin:'0 3vw' }}>Featured</h1>
    <div className='home-card-box'>
        
    {dproduct.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            dproduct.map((product) => (
              
              <div className="home-product-card" key={product.id}>
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
          )}</div>
    </section>
    
    <Footer/>
    
 </>
    )
}

