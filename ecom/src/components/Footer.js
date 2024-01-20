import React ,{ useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Footer() {

return(
    <>

<footer >
<div className="footer-content ">
    <h3>Poshak</h3>
    <p>Best way to enjoy your day, starts with best dress</p>
    {/*<ul className="socials">
        <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
        <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
        <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
        <li><Link to="#"><i className="fa fa-youtube"></i></Link></li>
        <li><Link to="#"><i className="fa fa-linkedin-square"></i></Link></li>
</ul>*/}
</div>
<div className="footer-bottom">
    <p>copyright &copy; <Link to="/">Poshak</Link>  </p>
            
</div>

</footer>
</>)}