import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

// Allows products page to load only when needed
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user/:id" element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
              <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <QueryClientProvider client={queryClient}>
              <AdminDashboard />
            </QueryClientProvider>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route 
          path="/products/:productId" 
          element={
            <Suspense fallback={<div className="loading"></div>}>
              <ProductDetail />
            </Suspense>
        } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App
