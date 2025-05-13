import '../styles/Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/server/api/register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
    
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            alert(data.message || (data.success ? 'Registration successful!' : 'Registration failed'));
            navigate('/login');
            
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='register-parent'>
            <div className='register-container'>
                <div className='title-text'>
                    <h2>Create an account</h2>
                </div>
                <form onSubmit={handleSubmit} className='register-text'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email address' required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required />
                    <button type="submit" className='submit-button'>Continue</button>
                </form>
                <div className='register-login-text'>
                    <p>Already have an account? <Link to={'/login'}><b>Log in</b></Link></p>
                </div>
            </div>

        </div>
    );
}

export default Register;