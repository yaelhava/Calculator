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

        if (validateInputs(username, email, setError)) {
            setAuthUsername(username);
            navigate("/calculator");
        }        
    };

    const handleButtonClick = () => {
        setError('');
    };

    return (
        <div className="login-container">
            <div  className='login-form'>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <CustomInput  
                    placeholder="Enter your name"
                    value={username} 
                    onChange={setUsername} 
                     />
                    <br />
                    <CustomInput  
                    placeholder="Enter your email"
                    value={email} 
                    onChange={setEmail} 
                     />
                    <br />
                    <button className="login-button" type="submit" onClick={handleButtonClick}>Login</button>
                </form>
            </div>
        </div>
    )
}


function validateInputs(username, email, setError) {
    if (!username || !email) {
        setError('Please fill in all fields');
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setError('Please enter a valid email address');
        return false;
    }

    return true;
}


function CustomInput({...props}) {
     return (
        <input 
            className="input-field" 
            type="text"
            placeholder={props.placeholder}
            value={props.value} 
            onChange={(e) => props.onChange(e.target.value)}
            />
    )
}


export default Login;