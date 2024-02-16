import React ,{ useState,useEffect ,useRef } from 'react'
import { Link } from "react-router-dom";
import { useProductsContext } from '../context/ApiContext';
import Footer from './Footer';

export default function Home()  {
  
    const { products, loading } = useProductsContext();
    const [slideIndex, setSlideIndex] = useState(0);
    const containerRef = useRef(null);
    const [cato_product,setcatoproduct]=useState(['none'])
    const dproduct = products.filter((product) => product.featured === true);
        useEffect(() => {
          const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
          }, 2000);
      
          return () => clearInterval(interval);
        }, []);
        useEffect(() => {
            // Extract unique categories from the products array
            const uniqueCategories = Array.from(new Set(products.map(product => product.cato)));

            // Create an array of objects containing details for each category
            const detailsArray = uniqueCategories.map(category => {
              const categoryProducts = products.filter(product => product.cato === category);
              return {
                category,
                products: categoryProducts[0],
              };
            });
        
            setcatoproduct(detailsArray);
          }, [products]);
          console.log(cato_product)
        /*/useEffect(()=>{
            let m=0
            for (const j in dproduct  &  !m == 10){
                console.log(j)
                for ( const i in j){
                    console.log(i)
               if ( !cato_product.includes(i.cato)){
                   setcatoproduct((prev) => [...prev, i])
               }
               m+=1
           }}
          // },[])*/

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
            img: 'https://www.samyakk.com/blog/wp-content/uploads/2023/07/07.Lehenga-1200x628-1024x536.jpg',
            caption: 'Caption Two',
          },
          {
            id: 3,
            img: 'https://www.libas.in/cdn/shop/files/desktop-banner_1_1d2adb9a-26d4-41db-87a8-f0e253942888_1500x.jpg?v=1704855285',
            caption: 'Caption Three',
          },
        ];


    
    
    

    

    const handleSlideRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 250;
            smoothScroll(containerRef.current, 250);
          }
    };
  
    const handleSlideLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 350;
            smoothScroll(containerRef.current, -350);}
    };

    const smoothScroll = (element, distance) => {
        element.scroll({
          left: element.scrollLeft + distance,
          behavior: 'smooth',
        });
      };

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
    <button id="slideLeft" type="button" onClick={handleSlideLeft}>
    <span class="material-symbols-outlined">
        keyboard_double_arrow_left
    </span>
      </button>
      <button id="slideRight" type="button" onClick={handleSlideRight}>
      <span class="material-symbols-outlined">
        keyboard_double_arrow_right
    </span>
      </button>
    <div id="container" ref={containerRef} className='home-card-box' style={{  whiteSpace: 'nowrap' }}>
    
    {dproduct.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            dproduct.map((product) => (
              
              <div className="home-product-card" key={product.id}>
                
                <Link
                  
                  to={{
                    pathname: `/product/${product.id}`,
                    state: { productData: product },
                  }}
                >
                  <div className="card-content">
                  <img src={product.image} alt="Product Image" />
                </div>
                </Link>
              </div>
              
            ))
          )}</div>
    </section>

    <section>
    <h1 style={{fontWeight :'bold',fontSize:'42px',margin:'0 3vw' }}>Categories</h1>
    <div className='home-cato-box'>
    {cato_product.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            cato_product.map((product) => (
              <div style={{display:'grid',justifyItems: 'center'}}>
              <div className="home-cato-card" key={product.products.id}>
                
                <Link
                  
                  to={{
                    pathname: `/d/${product.category}`,
                    state: { productData: product },
                  }}
                >
                  <div className="card-content">
                  <img src={product.products.image} alt="Product Image" />
                </div>
                </Link>
                
              </div>
              <h3>{product.category}</h3>
              </div>
              
            ))
          )}
    </div>
    </section>
    
    <Footer/>
    
 </>
    )
}

