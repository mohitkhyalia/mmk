import React from 'react';
import { Link,useParams } from "react-router-dom";



const Footer = () => {
  return (
    <footer>
        <div>
           <Link to='https://instagram.com/moghitclothing' ><img src='logo1.jpg' style={{height :'5vh' , width : '5vh',borderRadius:'12px'}} alt='Logo'/> </Link>
        </div>
      <p>&copy; {new Date().getFullYear()} MogHit. All rights reserved.</p>
      <p>
        Made with <span role="img" aria-label="heart">❤️</span> by me.
      </p>
    </footer>
  );
};

export default Footer;