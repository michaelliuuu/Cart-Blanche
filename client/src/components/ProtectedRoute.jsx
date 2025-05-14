import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userJSON = localStorage.getItem('user');
    // console.log('Stored user in localStorage:', userJSON);

    const user = userJSON ? JSON.parse(userJSON) : null;
    // console.log('Parsed user object:', user);

    if (!user) {
        // console.log('No user found, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // console.log(`User role (${user.role}) not allowed, redirecting to unauthorized`);
        return <Navigate to="/unauthorized" replace />;
    }

    console.log('Access granted to route');
    return children;
};

export default ProtectedRoute;
