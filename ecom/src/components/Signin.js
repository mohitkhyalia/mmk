import React ,{ useState } from 'react'
import { Link ,Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Singup from './Singup';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin  } from '@react-oauth/google';

export default function Singin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [si,setsi]=useState(false)

    const { submitlogin, updateislog } = useAuth();
    

    const handleLogin = () => {
        const ldata={"email":username,"password":password}
            
        //console.log(ldata)
       submitlogin(ldata)
       updateislog(true)
        
      }
      const handlesi = () => {
        // Call the logout function to log out the user
        setsi(true);
      }
    return(
        <>
        {si?(<><Singup/></>):(<>
        <div className='bgimg'></div>
        <div className='login-main'>

            <div className="login-container">
                <div className='pink'>
                    <h2>Login</h2>
                </div>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
                    </div>
                    <div className="form-group">
                        <button onClick={handleLogin}>SignIn</button>
                        <Link onClick={handlesi}>Signup</Link>
                    </div>
    

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            const decoded = jwtDecode(credentialResponse?.credential);
                            const lval={"email":decoded.email,"password":decoded.sub}
                            submitlogin(lval)
                        //console.log(decoded);
                            }}
                        onError={() => {
                        console.log('Login Failed');
                        }}/>;
                </form>
            </div>
        </div></>)}
        </>)
    

}