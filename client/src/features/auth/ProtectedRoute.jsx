import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, publicRoute = false, requireAdmin = false }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (publicRoute) {
        return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
