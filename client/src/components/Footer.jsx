import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

import '../styles/Footer.css'

function Footer() {
    return (
        <footer className='footer-container'>
            <nav className="social-icons">
                <a href="https://www.facebook.com" target='_blank'>
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="https://www.twitter.com" target='_blank'>
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="https://www.instagram.com" target='_blank'>
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
            </nav>
            <p>© Cart Blanche 2025</p>
        </footer>
    );
}

export default Footer;