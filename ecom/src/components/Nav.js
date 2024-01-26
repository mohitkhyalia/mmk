import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Nav() {

    const [sidePanelWidth, setSidePanelWidth] = useState('none');
    const { suserData,isLoggedIn ,submitlogout,updateislog,saleinfo} = useAuth();
     

    
      


    const openNav = () => {
        if (window.innerWidth <= 991) {
            setSidePanelWidth('block');
        }
    };

    const closeNav = () => {
        if (window.innerWidth <= 991) {
            setSidePanelWidth('none');
        }
    };

    useEffect(() => {
        
        // Check the window width on initial render and whenever the window is resized
        const handleWindowResize = () => {
            if (window.innerWidth <= 500) {
                setSidePanelWidth('none');
            } else {
                setSidePanelWidth('block');
            }
        };
        
        // Add an event listener for window resize
        window.addEventListener('resize', handleWindowResize);

        // Check the window width on initial render
        handleWindowResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        
    }, []);

    const handleLogout = () => {
        submitlogout();
        updateislog(false)
      }
      
      
     

      

      
      
    return(
        <>
        <section className="bg-b">
            <div className='sidebar sidepanel' id="mySidepanel" style={{ display: sidePanelWidth  }}>
            <button  className="closebtn" onClick={closeNav}>×</button>
                <div className="side-head">
                    <p>MogHit</p>
                </div>
                <hr className='hr'></hr>
                <div className='col-nav'>
                    <ul className='col-navul'>
                        <li className='col-nav-itm'><Link to={{pathname: `/d/${''}`}}>metireals</Link></li>
                        <li className='col-nav-itm'><Link  to={{pathname: `/d/${'readymade'}`}}>ReadyMade</Link></li>
                        <li className='col-nav-itm'><Link to={{pathname: `/d/${'saree'}`}}>Sarees</Link></li>
                        <li className='col-nav-itm'><Link to={{pathname: `/d/${''}`}}>****</Link></li>
                        <li className='col-nav-itm'><Link to={{pathname: `/d/${'night_wears'}`}}>Night wears</Link></li>
                        <li className='col-nav-itm'><Link to={{pathname: `/d/${'laptop'}`}}>Bangals</Link></li>
                        <li className='col-nav-itm'><Link to='/contact'>Contact Us</Link></li>
                        
                    </ul>
                </div>
                <div className='side-footer'>
                    <div className='m3'>
                    {isLoggedIn ? (<Link className='s-btn'onClick={handleLogout}>Log Out</Link>):(
                        <Link to='/profile' className='s-btn'>Login</Link>)}
                    </div>
                    
                </div>
            </div>

            
            
        
        </section>
        <div className='nav'>
            <div className='container'>
                <div>
                <button className="openbtn" onClick={openNav}>☰ </button>
                </div>
            
                <div >
                        <Link to='/profile' className='icon-btn'><span className="material-symbols-outlined">person</span></Link><Link to='/fav' className='icon-btn'><span className="material-symbols-outlined">favorite</span></Link><Link to='/cart' className='icon-btn'><span className="material-symbols-outlined">shopping_cart</span></Link>
                </div>
            </div>
            <div className='main-cols'>
            <Link to='/'>New</Link><Link to='/sale'>sale</Link><Link to='https://wa.me/919176782798'>Talk to Tailor</Link>
            </div>
        </div>

       
        </>)}