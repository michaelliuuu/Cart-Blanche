import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import Cart from './pages/Cart';

// Allows products page to load only when needed
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user/:userId" element={<UserDashboard />} />
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
