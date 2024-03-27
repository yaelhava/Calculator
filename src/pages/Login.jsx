// import React from 'react'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    // const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { setUsername: setAuthUsername } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email) {
            setError('Please fill in all fields');
            // setShowError(true);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            // setShowError(true);
            return;
        }

        setAuthUsername(username);
        navigate("/calculator");
    };


    const handleButtonClick = () => {
        // Clear error message and reset showError state on button click
        setError('');
        // setShowError(false);
    };

    return (
        <div>
            <div  className='login-form'>
                <h2>Login Page</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    <button type="submit" onClick={handleButtonClick}>Login</button>
                </form>
            </div>
        </div>
    )
}


export default Login;