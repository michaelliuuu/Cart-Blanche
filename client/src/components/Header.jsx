import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/AuthProvider';

import '../styles/Header.css';

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link 
          to={auth?.token ? (auth.user?.role === 'admin' ? '/admin' : '/user') : '/'}
          onClick={(e) => handleNavigation(e, auth?.token ? (auth.user?.role === 'admin' ? '/admin' : '/user') : '/')}
          className="logo"
        >
          Cart Blanche
        </Link>

        <ul className="nav-links">
          <li>
            <Link 
              to={auth?.token ? (auth.user?.role === 'admin' ? '/admin/cart' : '/user/cart') : '/cart'}
              onClick={(e) => handleNavigation(e, auth?.token ? (auth.user?.role === 'admin' ? '/admin/cart' : '/user/cart') : '/cart')}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>
          <li>
            <Link 
              // Checks token. If valid, checks role and logs into admin or user dashboard. Else, goes back to login page
              to={auth?.token ? (auth.user?.role === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard') : '/login'}
              // Same as above, but navigates to appropriate dashboard when user icon is clicked
              onClick={(e) => handleNavigation(e, auth?.token ? (auth.user?.role === 'admin' ? '/admin/admin-dashboard' : '/user/user-dashboard') : '/login')}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;