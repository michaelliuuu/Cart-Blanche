import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("test1");
            const response = await fetch('http://localhost:8000/server/api/login.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Network response was not ok');
    
            const data = await response.json();

            if (data.success) {
                // Saves user info to localStorage
                localStorage.setItem('user', JSON.stringify(data.user));

                alert('Login successful');
                
                // Checks to see if the user who is logging in is an admin
                if (data.user.role === "admin") {
                    navigate(`/admin`);  
                } else {
                    navigate(`/user/${data.user.id}`);  
                }
            } else {
                alert('Invalid credentials');
            }
        } catch(error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='login-parent'>
            <div className='login-container'>
                <div className='title-text'>
                    <h2>Welcome</h2>
                    <p>Sign in to manage email preferences, track orders and returns, and check out faster.</p>
                </div>
                <form className='login-text' onSubmit={handleSubmit}>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
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