import '../styles/Register.css'

function Register() {
    return (
        <div className='register-parent'>
            <div className='register-container'>
                <div className='title-text'>
                    <h2>Create an account</h2>
                </div>
                <div className='register-text'>
                    <textarea name="email" id="email" placeholder='email address'></textarea>
                    <textarea name="password" id="password" placeholder='password'></textarea>
                    <button className='submit-button'>Continue</button>
                </div>
                <div className='register-login-text'>
                    <p>Already have an account? <a href='/login'><b>Log in</b></a></p>
                </div>
            </div>

        </div>
    );
}

export default Register;