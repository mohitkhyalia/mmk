import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Nav() {

    const [sidePanelWidth, setSidePanelWidth] = useState('none');
    const { isLoggedIn ,submitlogout,updateislog} = useAuth();
     

    
      


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
        <section className="bg-b ">
            <div className='sidebar sidepanel' id="mySidepanel" style={{ display: sidePanelWidth  }}>
            <button  className="closebtn" onClick={closeNav}>×</button>
                <div className="side-head">
                <Link to='/' ><img src='https://drive.google.com/uc?id=1bqx81maMsmA7yrVXAIaeqGyJHAxdpy3T' alt="Product Image" /></Link>
                </div>
                {/*<hr className='hr'></hr>*/}
                <div className='col-nav'>
                    <ul className='col-navul '>
                       {/* <li className='col-nav-itm dropup'>metireals  <span class="material-symbols-outlined">arrow_drop_down</span>
                        <div className='dropup-content'>
                            <Link to={{pathname: `/d/${'saree'}`}}>Cloth</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}></Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>this</Link>
                            </div>
                        </li>*/}
                        
                        <li className='col-nav-itm dropup'>ReadyMade<div className='dropup-content'>
                            <Link to={{pathname: `/d/${'saree'}`}}>Formals</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Informals</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Treditionals</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Designer</Link>
                            </div></li>
                        <li className='col-nav-itm dropup'>Sarees<div className='dropup-content'>
                            <Link to={{pathname: `/d/${'saree'}`}}>Silk</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Regular</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}></Link>
                            <Link to={{pathname: `/d/${'saree'}`}}></Link>
                            </div></li>
                        <li className='col-nav-itm dropup'>Accessories<div className='dropup-content'>
                            <Link to={{pathname: `/d/${'saree'}`}}>Bangals</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Bindi</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Ear Rings</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}></Link>
                            </div></li>
                        <li className='col-nav-itm dropup'>Night wears<div className='dropup-content'>
                            <Link to={{pathname: `/d/${'saree'}`}}>One Piece</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Two Piece</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}>Three Piece</Link>
                            <Link to={{pathname: `/d/${'saree'}`}}></Link>
                            </div></li>
                        
                        
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
            <Link to='/n'>New Arrivals</Link><Link to='/sale'>Sale</Link><Link to='https://wa.me/919176782798'>Talk to Tailor</Link>
            </div>
        </div>

       
        </>)}