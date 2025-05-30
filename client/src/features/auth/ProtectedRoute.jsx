import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROUTES } from 'shared/routes/routes';
import LoadingCard from 'shared/ui/LoadingCard';

const ProtectedRoute = ({ children, publicRoute = false, requireAdmin = false }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <LoadingCard fullScreen size={40} />
    }

    if (publicRoute) {
        return isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : children;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.login} replace />;
    }

    if (requireAdmin && role !== 'admin') {
        return <Navigate to={ROUTES.dashboard} replace />;
    }

    return children;
};

export default ProtectedRoute;
