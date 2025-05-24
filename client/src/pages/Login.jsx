import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../components/AuthProvider';

import '../styles/Login.css'

function Login() {
    const auth = useAuth();
    const [input, setInput] = useState({ email: "", password: "" });

    // Handles Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (input.email !== "" && input.password !== "") {
                auth.loginAction(input);
            }
        } catch (e) {
            alert("Please provide a valid input.");
            console.log("Error: " + e);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    return (
        <div className='login-parent'>
            <div className='login-container'>
                <div className='title-text'>
                    <h2>Welcome</h2>
                    <p>Sign in to manage email preferences, track orders and returns, and check out faster.</p>
                </div>
                <form className='login-text' onSubmit={handleSubmit}>
                    <input type="text" name='email' id='email' value={input.email} onChange={handleInput} placeholder='Email Address' required />
                    <input type="password" name='password' id='password' value={input.password} onChange={handleInput} placeholder='Password' required />
                    <p><Link to={'/forgotpassword'}><b>Forgot password?</b></Link></p>
                    <button className='submit-button' type='submit'>Continue</button>
                </form>
                <div className='register-login-text'>
                    <p>Don't have an account? <Link to={'/register'}><b>Sign up</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;