import { ProductTable } from '../components/ProductTable';
import { useAuth } from '../components/AuthProvider'

import '../styles/Dashboard.css';

function AdminDashboard() {
  const auth = useAuth();

    return (
      <div className='dashboard-container'>
        <div className='dashboard-options-container'>
          <h2>Admin Dashboard</h2>
          <a href="#manage-products">Manage products</a>
          <a href="#manage-orders">Manage orders</a>
          <button onClick={auth.logOut}>Logout</button>
        </div>
        <div className='dashboard-display-container'>
          <div id='manage-products'>
            <ProductTable />  
          </div>
          <div id='manage-orders'>
            {/* Table that displays all users orders, filter to search for users */}
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  