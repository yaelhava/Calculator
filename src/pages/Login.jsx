// import React from 'react'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUsername: setAuthUsername } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email) {
            setError('Please fill in all fields');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setAuthUsername(username);
        navigate("/calculator");
    };


    const handleButtonClick = () => {
        setError('');
    };

    return (
        <div className="login-container">
            <div  className='login-form'>
                <h2>Login Page</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input 
                    className="input-field"
                    type="text" 
                    placeholder="Enter your name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <br />
                    <input 
                    className="input-field"
                    type="text" 
                    placeholder="Enter yout email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br />
                    <button className="login-button" type="submit" onClick={handleButtonClick}>Login</button>
                </form>
            </div>
        </div>
    )
}


export default Login;