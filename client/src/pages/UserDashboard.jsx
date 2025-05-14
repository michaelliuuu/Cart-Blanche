import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function UserDashboard() {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    // Logs out user
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate('/login');
    }

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <h2>User Dashboard</h2>
          <p>Welcome, user: {userInfo.id} </p>
          <a href="#manage-password">Change Password</a>
          <a href="#manage-order">Order Tracking</a>
          <a href="#manage-return">Returns/Refunds</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='dashboard-display-container'>
          <div id='manage-password'>
            <h2>Change Password</h2>
            <input type="text" placeholder='New password..'/>
            <button>Submit</button>
          </div>
          <div id='manage-order'>
            <h2>Manage Orders</h2>
          </div>
          <div id='manage-return'>
            <h2>Manage Returns</h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserDashboard;
  