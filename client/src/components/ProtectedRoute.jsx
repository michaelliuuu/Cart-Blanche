import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const auth = useAuth();

    // First check if auth context exists and has user data
    if (!auth || !auth.user) {
        console.log("User not logged in - redirecting to login");
        return <Navigate to="/login" replace />;
    }

    // Then check the token
    if (!auth.token) {
        console.log("No token found - redirecting to login");
        return <Navigate to="/login" replace />;
    }

    console.log('Access granted to route');
    return children;
};

// const ProtectedRoute = ({ allowedRoles, children }) => {
//     const auth = useAuth();
    
//     if (!auth?.token) return <Navigate to="/login" replace />;
//     if (allowedRoles && !allowedRoles.includes(auth.user?.role)) {
//       return <Navigate to="/unauthorized" replace />;
//     }
//     return children ? children : <Outlet />;
//   };

export default ProtectedRoute;
