import '../styles/ForgotPassword.css'

function ForgotPassword() {
    return (
        <div className='password-parent'>
            <div className='password-container'>
                <div className='title-text'>
                    <h2>Forgot Your Password?</h2>
                    <p>Enter your email address and we'll send you instructions to reset your password.</p>
                </div>
                <div className='password-text'>
                    <textarea name="email" id="email" placeholder='email address'></textarea>
                    <button className='submit-button'>Continue</button>
                </div>
                <div className='forgotpassword-text'>
                    <p>Back to <a href='/login'><b>sign in</b></a></p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;