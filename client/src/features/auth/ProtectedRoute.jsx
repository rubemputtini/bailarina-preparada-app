import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserRole } from './services/auth';

const ProtectedRoute = ({ children, publicRoute = false, requireAdmin = false }) => {
    const loggedIn = isLoggedIn();
    const role = getUserRole();

    if (publicRoute) {
        return loggedIn ? <Navigate to="/dashboard" replace /> : children;
    }

    if (!loggedIn) {
        return <Navigate to="/signup" replace />;
    }

    if (requireAdmin && role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
