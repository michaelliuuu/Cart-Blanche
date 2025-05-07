import { Link } from "react-router-dom";
import '../styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo">Cart Blanche</Link>

        <ul className="nav-links">
          <li><Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link></li>
          <li><Link to="/login">
            <FontAwesomeIcon icon={faUser} />
          </Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
