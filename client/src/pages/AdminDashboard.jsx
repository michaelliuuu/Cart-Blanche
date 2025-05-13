import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/login');
    }

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <p>Change password</p>
          <p>Add products</p>
          <p>Remove products</p>
          <p>Edit products</p>
          <p>View/manage orders</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='dashboard-display-container'>
          <h2>Admin Dashboard</h2>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  