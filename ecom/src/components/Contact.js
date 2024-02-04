import React ,{ useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Nav from './Nav';

export default function Contact()  {
  
    
       
    return(
        <>
        <Nav/>
        <div className='c-bgimg'></div>
        <div className='main'>
        <br/>

            <div className="login-container">
                <div className='pink'>
                    <h2>Contact Us</h2>
                </div>
                <div class="lft mini">
        
        <a href="https://mail.google.com/mail/u/0/?tab=wm#inbox?compose=GTvVlcRwPxSQsxxZQZfpdhNjmkmcLmGHJNbvGcKwltWfNClrPCtthDDCMsjvnKHBRtVmGsFRSQGCN">Mail Us</a>
        
        <a href="http://instagram.com/developer_mohit">Follow us</a>
    </div>
    <div class="rht mini-r">
        <form method="post" class="form">
            <input class="cname f contact-input" name="username" placeholder="Name" type="text"/>
            <input class="email f contact-input" type="email" name="email" placeholder="Email" required/>
            <textarea name="msg " placeholder="Enter your message here..." class="f msg" id="" cols="3" rows="1"></textarea>
            <button>Send</button>

        </form>
    </div>
            </div>
        </div>
    </>
    



    )
}

