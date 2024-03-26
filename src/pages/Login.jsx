// import React from 'react'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { setUsername: setAuthUsername } = useContext(AuthContext);

    const handleSubmit = (e) => {
        // e.preventDeafault();
        setAuthUsername(username);
        navigate("/calculator");
    };


    return (
        <div>
            <div  className='login-form'>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <br />
                    <input 
                    type="text" 
                    placeholder="Enter yout email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}


export default Login;