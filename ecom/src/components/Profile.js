import React ,{ useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Nav from './Nav';
import { useAuth  } from '../context/AuthContext';
import { useUser  } from '../context/UserContext';
import {useCart} from '../context/CartContext'
import Singin from './Signin';


export default function Profile() {
  const { getuser,isLoggedIn,suserData } = useAuth();
  const { updateData } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);

  //const datas=userData?.find((item) => item.name === suserData.name)
  

  const handleChange = (e) => {
    
  };

  const openForm = () => {
    setIsFormOpen(true);
  }

  const closeForm = () => {
    setIsFormOpen(false);
    console.log();
  }

  if(isLoggedIn){
    console.log(suserData,"-------Maind id----")
   // updateUserId(suserData.id);
  }
   

    return(
      <>
        {isLoggedIn ?( <>  
            <Nav/>
        
            <div className="prf-container main">
      <div id="logo">
        
      </div>

      <div className="leftbox">
        <nav className='prf-nav'>
          <Link to="/profile" className="active">
            <i className="fa fa-user"></i>
          </Link>
          
        </nav>
      </div>
      { suserData ?( 
      <div className="rightbox">
      
        <div className="profile">
          <h1 className='h1'>Personal Info</h1>
          <h2 className='h2'>Full Name</h2>
          <p className='p'>{ suserData.name} </p>
          <h2 className='h2'>Mobile No</h2>
          <p className='p'>{suserData.mob}</p>
          <h2 className='h2'>Gender</h2>
          <p className='p'>{suserData.gen}</p>
          <h2 className='h2'>Email</h2>
          <p className='p'>{suserData.email} </p>
          <h2 className='h2'>Password</h2>
          <p className='p'>******** </p>
          <h1 className='h1'>Billing Info</h1>
          <h2 className='h2'>Adress</h2>
          <p className='p'>{suserData.addr} {suserData.pincode} {suserData.country} </p>
          <button className="btn prf-btn" onClick={openForm}>update</button>
        </div>
        {isFormOpen && (
        <div class="pform-popup" id="myForm">
          <div class="pform-container">
            <h2 className='h1'>Update Details</h2>
          <h2 className='h2'>Password</h2>
          <p className='p'><input placeholder='New Password '/> </p>
          <p className='p'><input placeholder='Confirm Password 'onChange={handleChange}/> </p>
          <h2 className='h2'>Adress</h2>
          <p className='p'><input  placeholder='address....'onChange={handleChange}/></p>
          <button className="btn prf-btn" onClick={closeForm}>update</button>
          </div>
        </div> )}
        
      </div>
      ) : (
        <h1>Waiting for user data...</h1>
      )}
    </div>
    
        </>):(<Singin/>)}</>)
        }

        