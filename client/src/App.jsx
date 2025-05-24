import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './pages/Cart';
import AuthProvider from './components/AuthProvider';

import './styles/App.css';

// Allows products page to load only when needed
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route 
            path="/products/:productId" // Fix product ID
            element={
              <Suspense fallback={<div className="loading"></div>}>
                <ProductDetail />
              </Suspense>
            } 
          />

          {/* Protected User Routes */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
            <Route path="user-dashboard" element={<UserDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route index element={<Home />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <>
              <ProtectedRoute allowedRoles={['admin']} />
              <QueryClientProvider client={queryClient}>
                <Outlet />
              </QueryClientProvider>
            </>
          }>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="cart" element={<Cart />} />
            <Route index element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
