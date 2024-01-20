import React ,{ useState } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
export default function Singup() {

    const { submitlogin, submitUser, isLoggedIn,updateislog } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');

    const handlreg = () => {
        const ldata={email:email,name:username,password:password,mob:mobile}
        submitUser(ldata);
        
        updateislog(true)
        
        
      }

    return(
        <>
        {isLoggedIn?(<>hii</>):(<>
            <div className='bgimg'></div>
        <div className='login-main'>

            <div className="login-container">
                <div className='pink'>
                    <h2>Signup</h2>
                </div>
                <form className="login-form">
                    <div className="form-group">
                        <label for="username">Name:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Email:</label>
                        <input type="email" id="username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
                    </div>
                    <div className="form-group">
                        <label for="password">Mobile:</label>
                        <input type="text" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter your password" required/>
                    </div>

                    <div className="form-group">
                        <button onClick={handlreg}>SignUp</button>
                        <Link to='/signin'>Signin</Link>
                    </div>
                </form>
            </div>
        </div></>)}
        </>
    )

}