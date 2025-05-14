import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { ProductTable } from '../components/ProductTable';

function AdminDashboard() {
    // Logs out user
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate('/login');
    }

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <h2>Admin Dashboard</h2>
          <a href="#manage-products">Manage products</a>
          <a href="#manage-orders">Manage orders</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='dashboard-display-container'>
          <div id='manage-products'>
            <ProductTable />  
          </div>
          <div id='manage-orders'></div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  