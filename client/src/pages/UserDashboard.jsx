import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function UserDashboard() {
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/login');
    }

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <p>Change password</p>
          <p>Order Tracking</p>
          <p>Returns and Refunds</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='dashboard-display-container'>
          <h2>User Dashboard</h2>
          <p>Welcome, UserId: {userId}</p>
        </div>
      </div>
    );
  };
  
  export default UserDashboard;
  