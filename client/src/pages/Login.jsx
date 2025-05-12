import '../styles/Login.css'
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className='login-parent'>
            <div className='login-container'>
                <div className='title-text'>
                    <h2>Welcome</h2>
                    <p>Sign in to manage email preferences, track orders and returns, and check out faster.</p>
                </div>
                <div className='login-text'>
                    <textarea name="email" id="email" placeholder='email address'></textarea>
                    <textarea name="password" id="password" placeholder='password'></textarea>
                    <p><Link to={'/forgotpassword'}><b>Forgot password?</b></Link></p>
                    <button className='submit-button'>Continue</button>
                </div>
                <div className='register-login-text'>
                    <p>Don't have an account? <Link to={'/register'}><b>Sign up</b></Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;