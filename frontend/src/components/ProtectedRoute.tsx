
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export interface ProtectedRouteProps {
  children?: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Check if the route requires admin access
  if (adminOnly && profile?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
