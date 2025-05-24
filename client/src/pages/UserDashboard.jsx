import { useAuth } from '../components/AuthProvider'

import '../styles/Dashboard.css';

function UserDashboard() {
    const auth = useAuth();

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <h2>User Dashboard</h2>
          <p>Welcome, user: {auth.user.id} </p>
          <a href="#manage-password">Change Password</a>
          <a href="#manage-order">Order Tracking</a>
          <a href="#manage-return">Returns/Refunds</a>
          <button onClick={auth.logOut}>Logout</button>
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
  